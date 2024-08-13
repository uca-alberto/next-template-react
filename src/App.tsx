import "react-responsive-modal/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "leaflet/dist/leaflet.css";
import "./styles/App.css";
import Main from "./routes/route.main";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "./contexts/toastProvider";
import { AuthProvider } from "./contexts/authProvider";
import { PermissionsProvider } from "./contexts/permissionsProvider";

const queryClient = new QueryClient();

function App() {
  const classMain =
    "flex flex-col w-screen min-h-screen max-h-max bg-[#E0E0E0]";
  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ToastProvider>
            <AuthProvider>
              <PermissionsProvider>
                <div className={classMain}>
                  <div className="flex flex-grow bg-white/65">
                    <Main />
                  </div>
                </div>
              </PermissionsProvider>
            </AuthProvider>
          </ToastProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}
export default App;
