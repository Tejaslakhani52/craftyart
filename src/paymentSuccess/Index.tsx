import { useEffect, useState } from "react";
import CreditScoreIcon from "@mui/icons-material/CreditScore";

export default function Index() {
  const [secondsRemaining, setSecondsRemaining] = useState(5);

  const query = new URLSearchParams(window.location.search);
  const return_url = query.get("return_url") as string;

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      window.location.href = return_url;
    }, 5000);

    const interval = setInterval(() => {
      setSecondsRemaining((prevSeconds: any) => prevSeconds - 1);
    }, 1000);

    return () => {
      clearTimeout(redirectTimer);
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="not_found_page">
      <div className="inner_not_found">
        <div className="back_box">
          <CreditScoreIcon
            sx={{
              fontSize: "100px",
              backgroundColor: "#42d29d",
              borderRadius: "50%",
              padding: "10px",
              color: "white",
            }}
          />

          <h2
            style={{
              fontWeight: "600",
              marginTop: "30px",
              color: "#42d29d",
              fontSize: "40px",
            }}
          >
            Thank You!
          </h2>

          <h2
            style={{ fontWeight: "600", marginTop: "10px", fontSize: "18px" }}
          >
            Payment done Successfully
          </h2>

          <p style={{ marginTop: "10px" }}>
            Redirecting to page in {secondsRemaining} seconds...
          </p>
        </div>
      </div>
    </div>
  );
}
