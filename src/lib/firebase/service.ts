import {
  getDocs,
  getDoc,
  getFirestore,
  collection,
  query,
  where,
  addDoc,
  doc,
} from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt";

const firestore = getFirestore(app);

export async function retrieveData(collectionName: string) {
  const querySnapshot = await getDocs(collection(firestore, collectionName));
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
 
  return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
  const docRef = doc(firestore, collectionName, id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    throw new Error(`Dokumen dengan ID ${id} tidak ditemukan`);
  }

  return { id: snapshot.id, ...snapshot.data() };
}

export async function signUp(
  userData: {
    email: string;
    fullname: string;
    phone: string;
    password: string;
    role?: string;
  },
  callback: (status: boolean) => void
) {
  try {
    const q = query(
      collection(firestore, "users"),
      where("email", "==", userData.email)
    );
    const snapshot = await getDocs(q);

    if (!userData.role) {
      userData.role = "member";
    }

    if (!snapshot.empty) {
      callback(false);
    } else {
      userData.password = await bcrypt.hash(userData.password, 10);

      await addDoc(collection(firestore, "users"), userData);
      callback(true);
    }
  } catch (error) {
    console.error("Error during sign-up", error);
    callback(false);
  }
}

export async function signIn(email : string) {
    const q = query(
        collection(firestore, 'users'),
        where('email', '==', email),    
    );

    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    if (data) {
        return data[0];
    } else {
        return null;
    };
}
