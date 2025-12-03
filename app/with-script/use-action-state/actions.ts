"use server";

export type FormState = {
  message: string;
  status: "idle" | "success" | "error";
  submittedData?: {
    name: string;
    email: string;
  };
};

export async function submitFormAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  
  // Validate
  if (!name || name.length < 2) {
    return {
      message: "Name must be at least 2 characters",
      status: "error",
    };
  }
  
  if (!email || !email.includes("@")) {
    return {
      message: "Please enter a valid email address",
      status: "error",
    };
  }
  
  // Success!
  return {
    message: `Welcome, ${name}! We'll contact you at ${email}`,
    status: "success",
    submittedData: { name, email },
  };
}

