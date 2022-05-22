import { async } from "@firebase/util";
import { useEffect, useState } from "react";

const useToken = (user) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      const email = user?.user?.email;
      if (email) {
        fetch("http://localhost:5000/login", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ email }),
        })
          .then((res) => res.json())
          .then((data) => {
            setToken(data.accessToken);
            localStorage.setItem("accessToken", data.accessToken);
          });
      }
    };
    getToken();
  }, [user]);
  return [token, setToken];
};

export default useToken;
