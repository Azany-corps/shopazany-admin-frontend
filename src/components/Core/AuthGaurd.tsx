import React, { ReactNode, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
}

export default function AuthGuard({ children }: Props) {
  const [userLoggeIn, setUserLoggeIn] = useState(false);
  useEffect(() => {
    const tokenString = localStorage.getItem("token");
    if (!tokenString) {
      setUserLoggeIn(false);
      window.location.href = "/login";

      return;
    }

    try {
      const token = tokenString;
      setUserLoggeIn(true);
    } catch (error) {
      console.error("Error parsing token:", error);
      // Handle the error as needed...
    }
  }, []);

  return <div>{userLoggeIn ? children : <></>}</div>;
}
