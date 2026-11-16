import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, CirclePlus, MessageSquare, PencilLine, Send, Sparkles, Trash2 } from 'lucide-react'
import ConfirmDialog from '../components/ConfirmDialog'
import AIPlanPreview from '../components/AIPlanPreview'
import Modal from '../components/Modal'
import AISourceList from '../components/AISourceList'
import PageLoader from '../components/PageLoader'
import { useAppSettings } from '../context/AppSettingsContext'
import { useAuth } from '../context/AuthContext'
import {
  callBIRAI,
  createAIConversation,
  getAIConversationMessages,
  getAIErrorKey,
  isAIAvailable,
  listAIConversations,
  renameAIConversation,
} from '../services/aiService'

const makeRequestId = () => globalThis.crypto?.randomUUID?.() || 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
  const random = Math.random() * 16 | 0
  return (char === 'x' ? random : (random & 0x3) | 0x8).toString(16)
})

const withRequestTimeout = (request, milliseconds) =>
  new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(Object.assign(new Error('BIR AI request timed out.'), { code: 'deadline-exceeded' }))
    }, milliseconds)

    Promise.resolve(request).then(
      (result) => {
        clearTimeout(timeout)
        resolve(result)
      },
      (requestError) => {
        clearTimeout(timeout)
        reject(requestError)
      },
    )
  })

const AIAssistantPage = () => {
  const { user } = useAuth()
  const { language, t } = useAppSettings()
  const [conversations, setConversations] = useState([])
  const [conversationId, setConversationId] = useState('')
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [mode, setMode] = useState('life')
  const [loadingHistory, setLoadingHistory] = useState(true)
  const [loadingOlder, setLoadingOlder] = useState(false)
  const [hasOlderMessages, setHasOlderMessages] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [retryRequest, setRetryRequest] = useState(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [renameOpen, setRenameOpen] = useState(false)
  const [renameTitle, setRenameTitle] = useState('')
  const [renaming, setRenaming] = useState(false)
  const messagesEndRef = useRef(null)
  const translateRef = useRef(t)

  useEffect(() => {
    translateRef.current = t
  }, [t])

  useEffect(() => {
    let active = true
    const loadLatestConversation = async () => {
      setLoadingHistory(true)
      setError('')
      if (!user?.uid || !isAIAvailable) {
        setLoadingHistory(false)
        return
      }

      try {
        const items = await listAIConversations(user.uid)
        if (!active) return
        setConversations(items)
        const latest = items[0]
        const history = latest ? await getAIConversationMessages(latest.id) : []
        if (!active) return
        setConversationId(latest?.id || '')
        setMessages(history)
        setHasOlderMessages(history.length === 60)
      } catch (loadError) {
        if (active) setError(translateRef.current(getAIErrorKey(loadError)))
      } finally {
        if (active) setLoadingHistory(false)
      }
    }

    loadLatestConversation()
    return () => {
      active = false
    }
  }, [user?.uid])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, sending])

  const beginNewConversation = () => {
    if (sending || loadingOlder) return
    setConversationId('')
    setMessages([])
    setHasOlderMessages(false)
    setInput('')
    setError('')
    setRetryRequest(null)
  }

  const openConversation = async (id) => {
    if (sending || loadingOlder || id === conversationId) return
    setError('')
    setRetryRequest(null)
    setHasOlderMessages(false)
    try {
      const history = await getAIConversationMessages(id)
      setConversationId(id)
      setMessages(history)
      setHasOlderMessages(history.length === 60)
    } catch (loadError) {
      setError(t(getAIErrorKey(loadError)))
    }
  }

  const loadOlderMessages = async () => {
    const beforeSequence = messages[0]?.sequence
    if (!conversationId || typeof beforeSequence !== 'number' || loadingOlder) return
    setLoadingOlder(true)
    try {
      const older = await getAIConversationMessages(conversationId, beforeSequence)
      setMessages((current) => [...older, ...current])
      setHasOlderMessages(older.length === 60)
    } catch (loadError) {
      setError(t(getAIErrorKey(loadError)))
    } finally {
      setLoadingOlder(false)
    }
  }

  const sendMessage = async (value, retry = false, selectedMode = mode) => {
    const message = value.trim()
    if (!message || sending || !isAIAvailable || !user?.uid) return

    setError('')
    setSending(true)
    const isRetry = retry && Boolean(retryRequest)
    let targetConversationId = conversationId
    const requestId = isRetry ? retryRequest.requestId : makeRequestId()
    const requestMode = isRetry ? retryRequest.mode : selectedMode

    if (!isRetry) {
      setInput('')
      setMessages((current) => [
        ...current,
        { id: `local_${requestId}`, role: 'user', content: message },
      ])
      setRetryRequest({ conversationId: targetConversationId, requestId, message, mode: requestMode })
    }

    try {
      if (isRetry) targetConversationId = retryRequest.conversationId || conversationId

      if (!targetConversationId) {
        targetConversationId = await withRequestTimeout(
          createAIConversation(user.uid, message),
          12000,
        )
        setConversationId(targetConversationId)
        setConversations((current) => [
          { id: targetConversationId, title: message.slice(0, 100) },
          ...current,
        ])
      }

      setRetryRequest({ conversationId: targetConversationId, requestId, message, mode: requestMode })
      const result = await withRequestTimeout(
        callBIRAI({
          action: 'chat',
          conversationId: targetConversationId,
          requestId,
          message,
          language,
          mode: requestMode,
        }),
        60000,
      )
      setMessages((current) => [
        ...current,
        {
          id: result.id,
          role: 'assistant',
          content: result.content,
          plan: result.plan,
          savedPlanId: result.savedPlanId,
          resources: result.resources || [],
        },
      ])
      setRetryRequest(null)
      setConversations((current) => {
        const existing = current.find((item) => item.id === targetConversationId)
        return [
          { ...existing, id: targetConversationId, updatedAt: new Date().toISOString() },
          ...current.filter((item) => item.id !== targetConversationId),
        ]
      })
    } catch (sendError) {
      if (!isRetry) setInput((current) => current || message)
      setError(t(getAIErrorKey(sendError)))
    } finally {
      setSending(false)
    }
  }

  const submitMessage = (event) => {
    event.preventDefault()
    sendMessage(input)
  }

  const clearConversation = async () => {
    if (!conversationId) return
    setDeleteOpen(false)
    setError('')
    setSending(true)
    try {
      await callBIRAI({ action: 'deleteConversation', conversationId })
      setConversations((current) => current.filter((item) => item.id !== conversationId))
      beginNewConversation()
    } catch (deleteError) {
      setError(t(getAIErrorKey(deleteError)))
    } finally {
      setSending(false)
    }
  }

  const beginRenameConversation = () => {
    const current = conversations.find((item) => item.id === conversationId)
    if (!current) return
    setRenameTitle(current.title || '')
    setRenameOpen(true)
  }

  const renameConversation = async (event) => {
    event.preventDefault()
    const title = renameTitle.trim()
    if (!conversationId || !title || renaming) return

    setError('')
    setRenaming(true)
    try {
      await renameAIConversation(conversationId, title)
      setConversations((current) =>
        current.map((item) => (item.id === conversationId ? { ...item, title } : item)),
      )
      setRenameOpen(false)
    } catch (renameError) {
      setError(t(getAIErrorKey(renameError)))
    } finally {
      setRenaming(false)
    }
  }

  const specialists = ['life', 'career', 'education', 'documents', 'finance', 'social']
  const starters = [
    { key: 'starterCareer', mode: 'career' },
    { key: 'starterUniversity', mode: 'education' },
    { key: 'starterDocuments', mode: 'documents' },
    { key: 'starterProgramming', mode: 'education' },
    { key: 'starterBudget', mode: 'finance' },
    { key: 'starterLearning', mode: 'education' },
  ]

  if (loadingHistory) return <PageLoader label={t('ai.loadingHistory')} />

  return (
    <section className="page-section ai-page">
      <header className="ai-hero">
        <div className="ai-orbit" aria-hidden="true">
          <span className="ai-orbit-ring" />
          <span className="ai-orbit-core"><Sparkles size={30} /></span>
          <span className="ai-orbit-dot ai-orbit-dot-one" />
          <span className="ai-orbit-dot ai-orbit-dot-two" />
        </div>
        <div className="ai-hero-copy">
          <span className="eyebrow accent">{t('ai.eyebrow')}</span>
          <h1>{t('ai.title')}</h1>
          <p>{t('ai.intro')}</p>
          <p className="ai-privacy-note">{t('ai.privacyNote')}</p>
          <p className="ai-safety-note">{t('ai.safetyNote')}</p>
          <p className="ai-source-availability">{t('ai.sourceNote')}</p>
        </div>
      </header>

      {!isAIAvailable ? (
        <div className="message-box error ai-config-notice" role="status">{t('ai.notConfigured')}</div>
      ) : null}
      {error ? (
        <div className="message-box error ai-config-notice" role="alert">
          <span>{error}</span>
          {retryRequest ? (
            <button type="button" className="secondary-button small-button" disabled={sending} onClick={() => sendMessage(retryRequest.message, true, retryRequest.mode)}>
              {t('ai.retry')}
            </button>
          ) : null}
        </div>
      ) : null}

      <div className="ai-workspace">
        <aside className="ai-history-panel">
          <div className="ai-history-heading">
            <h2>{t('ai.history')}</h2>
            <button type="button" className="icon-button" aria-label={t('ai.newConversation')} onClick={beginNewConversation} disabled={sending || loadingOlder}>
              <CirclePlus size={18} />
            </button>
          </div>
          <button type="button" className="primary-button ai-new-chat-button" onClick={beginNewConversation} disabled={sending || loadingOlder}>
            <CirclePlus size={16} /> {t('ai.newConversation')}
          </button>
          <div className="ai-history-list">
            {conversations.map((conversation) => (
              <button
                type="button"
                key={conversation.id}
                className={`ai-history-item ${conversation.id === conversationId ? 'active' : ''}`}
                onClick={() => openConversation(conversation.id)}
                disabled={sending || loadingOlder}
              >
                <MessageSquare size={15} />
                <span>{conversation.title || t('ai.untitledConversation')}</span>
              </button>
            ))}
            {conversations.length === 0 ? <p className="ai-history-empty">{t('ai.noHistory')}</p> : null}
          </div>
          {conversationId ? (
            <div className="ai-history-actions">
              <button type="button" className="secondary-button small-button" onClick={beginRenameConversation} disabled={sending || loadingOlder}>
                <PencilLine size={14} /> {t('ai.rename')}
              </button>
              <button type="button" className="secondary-button small-button danger" onClick={() => setDeleteOpen(true)} disabled={sending || loadingOlder}>
                <Trash2 size={14} /> {t('ai.clear')}
              </button>
            </div>
          ) : null}
        </aside>

        <div className="ai-chat-panel">
          <div className="ai-chat-toolbar">
            <div className="ai-assistant-label"><Bot size={18} /> BIR AI</div>
            <label className="ai-specialty-select">
              <span>{t('ai.specialty')}</span>
              <select value={mode} onChange={(event) => setMode(event.target.value)} disabled={sending}>
                {specialists.map((specialist) => (
                  <option key={specialist} value={specialist}>{t(`ai.specialties.${specialist}`)}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="ai-messages" role="log" aria-label={t('ai.history')} aria-live="polite">
            {hasOlderMessages ? (
              <button type="button" className="secondary-button small-button ai-load-older" onClick={loadOlderMessages} disabled={loadingOlder || sending}>
                {loadingOlder ? t('ai.loadingHistory') : t('ai.loadOlder')}
              </button>
            ) : null}
            {messages.length === 0 ? (
              <div className="ai-welcome">
                <div className="ai-welcome-icon"><Sparkles size={22} /></div>
                <h2>{t('ai.welcomeTitle')}</h2>
                <p>{t('ai.welcomeDescription')}</p>
                <div className="ai-starter-grid">
                  {starters.map((starter) => (
                    <button
                      type="button"
                      className="ai-starter"
                      key={starter.key}
                      disabled={!isAIAvailable || sending}
                      onClick={() => {
                        setMode(starter.mode)
                        sendMessage(t(`ai.${starter.key}`), false, starter.mode)
                      }}
                    >
                      {t(`ai.${starter.key}`)}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <motion.article
                    key={message.id}
                    className={`ai-message ${message.role === 'user' ? 'user' : 'assistant'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="ai-message-author">
                      {message.role === 'assistant' ? <Sparkles size={14} /> : null}
                      {message.role === 'assistant' ? 'BIR AI' : t('ai.you')}
                    </div>
                    <p>{message.content}</p>
                    {message.plan ? (
                      <AIPlanPreview
                        key={message.id}
                        conversationId={conversationId}
                        messageId={message.id}
                        plan={message.plan}
                        savedPlanId={message.savedPlanId}
                      />
                    ) : null}
                    {message.role === 'assistant' && message.resources?.length > 0 ? (
                      <AISourceList resources={message.resources} />
                    ) : null}
                  </motion.article>
                ))}
              </AnimatePresence>
            )}

            {sending ? (
              <div className="ai-typing" role="status" aria-label={t('ai.generating')}>
                <span />
                <span />
                <span />
                <em>{t('ai.generating')}</em>
              </div>
            ) : null}
            <div ref={messagesEndRef} />
          </div>

          <form className="ai-composer" onSubmit={submitMessage}>
            <label className="sr-only" htmlFor="bir-ai-message">{t('ai.messageLabel')}</label>
            <textarea
              id="bir-ai-message"
              rows={2}
              maxLength={4000}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={t('ai.messagePlaceholder')}
              disabled={!isAIAvailable}
            />
            <div className="ai-composer-footer">
              <span>{t('ai.messageLimit')}</span>
              <button type="submit" className="primary-button" disabled={!isAIAvailable || sending || !input.trim()}>
                <Send size={15} /> {sending ? t('ai.sending') : t('ai.send')}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ConfirmDialog
        isOpen={deleteOpen}
        title={t('ai.deleteTitle')}
        message={t('ai.confirmDelete')}
        onClose={() => setDeleteOpen(false)}
        onConfirm={clearConversation}
        confirmLabel={t('ai.clear')}
      />
      <Modal
        isOpen={renameOpen}
        title={t('ai.rename')}
        onClose={() => {
          if (!renaming) setRenameOpen(false)
        }}
      >
        <form className="auth-form" onSubmit={renameConversation}>
          <label className="form-field">
            <span>{t('ai.renamePrompt')}</span>
            <input
              autoFocus
              maxLength={100}
              value={renameTitle}
              onChange={(event) => setRenameTitle(event.target.value)}
              disabled={renaming}
            />
          </label>
          <div className="dialog-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => setRenameOpen(false)}
              disabled={renaming}
            >
              {t('common.cancel')}
            </button>
            <button type="submit" className="primary-button" disabled={renaming || !renameTitle.trim()}>
              {renaming ? t('common.saving') : t('common.save')}
            </button>
          </div>
        </form>
      </Modal>
    </section>
  )
}

export default AIAssistantPage
