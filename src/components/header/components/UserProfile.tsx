import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { consoleShow } from "../../../commonFunction/console";

export default function UserProfile({ userProfile, imageBaseUrl }: any) {
  consoleShow("userProfile: ", userProfile);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    navigate("/");
    setAnchorEl(null);
    window.location.reload();
    localStorage.clear();
  };

  const ProfileImage = () => {
    return userProfile?.photo_uri !== "null" && userProfile?.photo_uri ? (
      userProfile?.photo_uri.includes("googleusercontent") ? (
        <img
          src={`${userProfile?.photo_uri}`}
          alt="Selected file preview"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : (
        <img
          src={`${imageBaseUrl}${userProfile?.photo_uri}`}
          alt="Selected file preview"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )
    ) : (
      <div
        style={{
          background:
            "linear-gradient(268.03deg, #5961F8 -0.66%, #5961F8 -0.65%, #497DEC 22.41%, #15D8C5 100%, #15D8C5 100%)",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          fontSize: "23px",
          textTransform: "capitalize",
        }}
      >
        {userProfile?.name?.charAt(0)}
      </div>
    );
  };
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ padding: "2px 2px", minWidth: "auto" }}
      >
        <div
          style={{
            borderRadius: "50%",
            width: "47px",
            height: "47px",
            overflow: "hidden",
          }}
          id="offcanvasBottomLabel"
        >
          <ProfileImage />
        </div>
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>
          <Box
            sx={{
              display: "flex",
              gap: "15px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                overflow: "hidden",
              }}
            >
              <ProfileImage />
            </div>
            <div>
              <h4 className="mb-0">
                {userProfile?.name || userProfile?.displayName}
              </h4>
              <p
                style={{
                  fontSize: "13px",
                  opacity: "0.7",
                  maxWidth: "173px",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  marginBottom: "0",
                }}
              >
                {userProfile?.email}
              </p>
            </div>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            navigate("/subscriptions", { state: userProfile });
            setAnchorEl(null);
          }}
        >
          My account
        </MenuItem>
        <MenuItem onClick={handleClose}>Sign out</MenuItem>
      </Menu>
    </div>
  );
}
