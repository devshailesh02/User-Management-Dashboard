// ------------------------------------- check name -----------------------------//

export const validName = (name) => {
  // Type check
  if (typeof name !== "string") {
    return {
      success: false,
      message: "Name must be a string",
    };
  }

  const trimmed = name.trim();

  // Empty check
  if (!trimmed) {
    return {
      success: false,
      message: "Name is required",
    };
  }

  // Length check
  if (trimmed.length < 3) {
    return {
      success: false,
      message: "Name must be at least 3 characters",
    };
  }

  if (trimmed.length > 50) {
    return {
      success: false,
      message: "Name must not exceed 50 characters",
    };
  }

  // Pattern check
  if (!/^[A-Za-z0-9\s]+$/.test(trimmed)) {
    return {
      success: false,
      message: "Name can only contain letters and spaces and number",
    };
  }

  // ✅ Valid case
  return {
    success: true,
    message: trimmed.toLowerCase(),
  }; // or return true
};

// ------------------------------------- check email -----------------------------//

export const validEmail = (email) => {
  // 1. Type check (safest first)
  if (typeof email !== "string") {
    return {
      success: false,
      message: "Email must be a string",
    };
  }

  // 2. Trim once and reuse
  const trimmed = email.trim();

  // 3. Empty check
  if (!trimmed) {
    return {
      success: false,
      message: "Email is required",
    };
  }

  // 4. Length check (avoid unnecessary regex on junk)
  if (trimmed.length > 254) {
    return {
      success: false,
      message: "Email is too long",
    };
  }

  // 5. Format check (regex → most expensive)
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(trimmed)) {
    return {
      success: false,
      message: "Invalid email format",
    };
  }

  // ✅ Valid
  return {
    success: true,
    message: trimmed.toLowerCase(),
  };
};

// -------------------------------------- check password ------------------------------------------//

export const validPassword = (password, cnf_password) => {
  if (!password) {
    return { success: false, message: "Password is required" };
  }

  if (password.length < 6) {
    return {
      success: false,
      message: "Password must be at least 6 characters",
    };
  }

  // optional strong password rules
  const hasNumber = /\d/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);

  if (!hasNumber || !hasLetter) {
    return {
      success: false,
      message: "Password must contain letters and numbers",
    };
  }

  // confirm password check
  if (password !== cnf_password) {
    return { success: false, message: "Passwords do not match" };
  }

  return { success: true, message: password };
};
