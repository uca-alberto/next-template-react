import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authProvider";
import { useEffect, useState, memo } from "react";
import { LoginAwait } from "./login/component.login-await";
import { LoginMain } from "./login/component.login-main";

const MemoLoginAwait = memo(LoginAwait);
const MemoLoginMain = memo(LoginMain);

export default function Login() {
  const { user, loading } = useAuth();
  const [loadingAwait, setLoadingAwait] = useState(true);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        if (!loading && user) {
          navigateTo("/");
          return;
        }
        setLoadingAwait(false);
      }, 1000);
    }
    return;
  }, [loading]);

  return <>{loadingAwait ? <MemoLoginAwait /> : <MemoLoginMain />}</>;
}
