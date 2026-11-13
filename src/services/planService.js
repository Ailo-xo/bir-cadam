import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db, isFirebaseConfigured } from '../firebase/firebase'

const localStorageKey = 'bir-kadam-plans'

const createPlanRecord = (plan) => ({
  id: plan.id || `plan-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  userId: plan.userId,
  title: plan.title,
  description: plan.description,
  category: plan.category,
  steps: (plan.steps || []).map((step) => ({
    id: step.id || `step-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title: step.title,
    completed: Boolean(step.completed),
    dueDate: step.dueDate || '',
  })),
  createdAt: plan.createdAt || new Date().toISOString(),
  updatedAt: plan.updatedAt || new Date().toISOString(),
})

const getLocalPlans = () => {
  try {
    return JSON.parse(localStorage.getItem(localStorageKey) || '[]')
  } catch {
    return []
  }
}

const persistLocalPlans = (plans) => {
  localStorage.setItem(localStorageKey, JSON.stringify(plans))
}

export const createPlan = async (plan) => {
  if (!isFirebaseConfigured) {
    const currentPlans = getLocalPlans()
    const record = createPlanRecord(plan)
    persistLocalPlans([record, ...currentPlans])
    return record
  }

  const payload = {
    ...plan,
    userId: plan.userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }

  const ref = await addDoc(collection(db, 'plans'), payload)
  const snapshot = await getDoc(ref)
  return { id: ref.id, ...snapshot.data() }
}

export const getPlansForUser = async (userId) => {
  if (!isFirebaseConfigured) {
    return getLocalPlans().filter((plan) => plan.userId === userId)
  }

  const q = query(collection(db, 'plans'), where('userId', '==', userId), orderBy('updatedAt', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }))
}

export const getPlanById = async (planId, userId) => {
  if (!isFirebaseConfigured) {
    return getLocalPlans().find((plan) => plan.id === planId && plan.userId === userId) || null
  }

  const snapshot = await getDoc(doc(db, 'plans', planId))
  const data = snapshot.data()
  if (!data || data.userId !== userId) return null
  return { id: snapshot.id, ...data }
}

export const updatePlan = async (planId, planUpdates, userId) => {
  if (!isFirebaseConfigured) {
    const plans = getLocalPlans().map((plan) => {
      if (plan.id !== planId || plan.userId !== userId) return plan
      return { ...plan, ...planUpdates, updatedAt: new Date().toISOString() }
    })
    persistLocalPlans(plans)
    return plans.find((plan) => plan.id === planId) || null
  }

  const ref = doc(db, 'plans', planId)
  await updateDoc(ref, {
    ...planUpdates,
    updatedAt: serverTimestamp(),
  })
  return { id: planId, ...planUpdates }
}

export const deletePlan = async (planId, userId) => {
  if (!isFirebaseConfigured) {
    const plans = getLocalPlans().filter((plan) => !(plan.id === planId && plan.userId === userId))
    persistLocalPlans(plans)
    return true
  }

  const ref = doc(db, 'plans', planId)
  const snapshot = await getDoc(ref)
  if (!snapshot.exists() || snapshot.data().userId !== userId) {
    return false
  }

  await deleteDoc(ref)
  return true
}

export const toggleStepCompletion = async (planId, stepId, userId) => {
  if (!isFirebaseConfigured) {
    const plans = getLocalPlans()
    let updatedPlan = null

    const nextPlans = plans.map((plan) => {
      if (plan.id !== planId || plan.userId !== userId) return plan

      updatedPlan = {
        ...plan,
        steps: (plan.steps || []).map((step) =>
          step.id === stepId ? { ...step, completed: !step.completed } : step,
        ),
        updatedAt: new Date().toISOString(),
      }
      return updatedPlan
    })

    persistLocalPlans(nextPlans)
    return updatedPlan
  }

  const snapshot = await getDoc(doc(db, 'plans', planId))
  if (!snapshot.exists()) return null

  const plan = snapshot.data()
  if (plan.userId !== userId) return null

  const nextSteps = (plan.steps || []).map((step) =>
    step.id === stepId ? { ...step, completed: !step.completed } : step,
  )

  await updateDoc(doc(db, 'plans', planId), {
    steps: nextSteps,
    updatedAt: serverTimestamp(),
  })

  return { id: planId, ...plan, steps: nextSteps }
}
