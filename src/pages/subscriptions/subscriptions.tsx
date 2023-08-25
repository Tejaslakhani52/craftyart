import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-hot-toast";
import CurrentPlan from "./components/CurrentPlan";
import axios from "axios";
import { consoleShow } from "../../commonFunction/console";

export default function Subscriptions() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [userProfile, setUserProfile] = useState<any>(null);
  const [uId, setuId] = useState<any>("");
  const [imagePreview, setImagePreview] = useState<any>(null);
  const [imageBaseUrl, setImageBaseUrl] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [currentPlan, setcurrentPlan] = useState<any>();
  consoleShow("currentPlan: ", currentPlan);
  const [removeImage, setRemoveImage] = useState<any>(false);

  useEffect(() => {
    const getData = localStorage.getItem("userProfile");
    setuId(getData);

    axios
      .post(
        "https://story.craftyartapp.com/my-currentPlan",
        {
          key: "qwfsegxdhbxfjhncf",
          user_id: getData,
        },
        { withCredentials: false }
      )
      .then((response: any) => {
        const jsonString = response.data.substring(
          response.data.indexOf("{"),
          response.data.lastIndexOf("}") + 1
        );
        const getDatas = JSON.parse(jsonString);
        consoleShow("getData: ", getDatas);
        setcurrentPlan(getDatas);
      })
      .catch((error) => consoleShow("currError: ", error));
  }, []);

  useEffect(() => {
    if (uId == "") {
      setUserProfile(null);
    } else fetchData();
    setIsLoading(true);
  }, [uId]);

  const fetchData = async () => {
    const getUserData: any = await api.getUser({
      key: "qwfsegxdhbxfjhncf",
      device_id: "",
      email: uId,
    });
    setImageBaseUrl(getUserData?.url);
    setUserProfile(getUserData?.user);
    setIsLoading(false);
  };

  const [acountDetail, setacountDetail] = useState<any>({
    name: "",
    user_id: "",
    updateDp: 0,
    photo_uri: null,
  });
  consoleShow("acountDetail: ", acountDetail);

  useEffect(() => {
    setacountDetail({
      ...acountDetail,
      name: userProfile?.name,
      user_id: userProfile?.uid,
      // photo_uri: userProfile?.photo_uri ?? "",
    });
  }, [userProfile]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      if (file) {
        const imageUrl: any = URL.createObjectURL(file);
        setImagePreview(imageUrl);
        setacountDetail({ ...acountDetail, photo_uri: file, updateDp: 1 });
      }
    }
  };

  const handleFileRemove = () => {
    setacountDetail({ ...acountDetail, photo_uri: null, updateDp: 1 });
    setImagePreview(null);
    setRemoveImage(true);
  };

  const updateFetchData = (event: any) => {
    setIsLoading(true);
    event.preventDefault();
    const getUpdateData: any = api.updateUser({
      key: "qwfsegxdhbxfjhncf",
      ...acountDetail,
    });
    consoleShow("getUpdateData: ", getUpdateData);
    setIsLoading(false);

    setTimeout(() => {
      fetchData();
      toast.success("User updated successfully");
      window.location.reload();
    }, 1000);
  };

  return (
    <>
      {/* ========== SUBSCRIPTION TABS START ======= */}
      <section className="subscriptions-contact mb-4">
        {/* ================ PROFILE UPLOAD ===========*/}
        <div className="profile_upload bg-white">
          <div className="current-contact px-md-5 px-sm-4 px-2 w-100 mx-auto align-items-center">
            <div className="current-profile d-sm-flex align-items-center justify-content-center py-3">
              <div className="current-profile-logo text-center">
                <div className="avatar-upload">
                  <div className="avatar-preview mx-sm-0 mx-auto">
                    <div
                      id="imagePreview"
                      style={{
                        overflow: "hidden",
                      }}
                    >
                      {imagePreview && (
                        <img
                          src={imagePreview}
                          alt="Selected file preview"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      )}
                      {userProfile?.photo_uri !== "null" &&
                      userProfile?.photo_uri &&
                      !removeImage ? (
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
                            fontSize: "30px",
                            textTransform: "capitalize",
                          }}
                        >
                          {userProfile?.name?.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="ps-md-5 ps-sm-3 ps-0 text-sm-start text-center">
                <h3>The file should be in PNG or JPG. Max size of 3 MB.</h3>
                <button
                  type="button"
                  className="btn btn-upload py-2 px-5 mt-sm-0 mt-3 position-relative"
                >
                  <div className="avatar-edit">
                    <input
                      type="file"
                      id="imageUpload"
                      accept=".png, .jpg, .jpeg"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="imageUpload"> Upload</label>
                  </div>
                </button>
                <button
                  type="button"
                  className="btn btn-upload py-2 px-5 mt-sm-0 mt-3 mx-3 position-relative"
                  onClick={handleFileRemove}
                >
                  <div className="avatar-edit">Remove</div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <ul className="nav nav-pills" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link py-3 active"
              id="pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-profile"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="true"
            >
              <i className="fa-solid fa-circle-user pe-2" />
              Profile
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link py-3"
              id="pills-subscriptons-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-subscriptons"
              type="button"
              role="tab"
              aria-controls="pills-subscriptons"
              aria-selected="false"
            >
              <i className="fa-regular fa-credit-card pe-2" />
              Subscription
            </button>
          </li>
        </ul>
        <div className="sm-container">
          <div
            className="tab-content container-sm-fluid mt-4"
            id="pills-tabContent"
          >
            <div
              className="tab-pane fade show active account_details_tab"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
              tabIndex={0}
            >
              <div className="current-plan p-4">
                {/* =============== PROFILE PHOTO START ================ */}
                {/* <h3 class="section_heading_title text-center pt-4 pb-2 mb-0">Profile Photo</h3>
                  <div class="profile_upload">
                      <div class="row current-contact px-md-5 px-sm-4 px-2 w-100 mx-auto align-items-center">
                          <div class="col-sm-8">
                              <div class="current-profile d-sm-flex align-items-center">
                                  <div class="current-profile-logo text-center">
                                      <div class="avatar-upload">
                                          <div class="avatar-preview mx-sm-0 mx-auto">
                                              <div id="imagePreview" style="background-image: url(assets/images/Icons/profile-icon.png);">
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                  <h3 class="mb-0 ps-md-5 ps-sm-3 ps-0">The file should be in PNG or JPG. Max size of 3 MB.</h3>
                              </div>
                          </div>
                          <div class="col-sm-4 text-center">
                              <button type="button" class="btn btn-upload py-2 px-5 mt-sm-0 mt-3">
                                  <div class="avatar-edit">
                                      <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg" />
                                      <label for="imageUpload"> Upload</label>
                                  </div>
                              </button>
                          </div>
                      </div>
                  </div> */}
                {/* =============== ACCOUNT DETAILS START ================ */}
                <h3 className="section_heading_title text-center">
                  Account Details
                </h3>
                <div className="current-plan-card">
                  <div className="current-contact w-100 mx-auto align-items-center">
                    {/* ======== LARGE SCREEN ACCOUNT DETAILS =========== */}
                    <div className="current-profile  ">
                      <div className="form-group mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Display name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="name"
                          value={acountDetail?.name}
                          onChange={(e) =>
                            setacountDetail({
                              ...acountDetail,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      {/* <div className="form-group mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Username
                        </label>
                        <input
                          disabled
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Infiapp Solutions"
                          value={userProfile?.name}
                        />
                      </div> */}
                      {userProfile?.email && (
                        <div className="form-group mb-3">
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label"
                          >
                            Email ID
                          </label>
                          <input
                            disabled
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="Infiappsolutions2022@gmail.com"
                            value={userProfile?.email}
                          />
                        </div>
                      )}
                      {userProfile?.number && (
                        <div className="form-group mb-3">
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label"
                          >
                            Phone number
                          </label>
                          <input
                            disabled
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="123 456 7890"
                            value={userProfile?.number}
                          />
                        </div>
                      )}
                    </div>

                    <div className="current-profile text-center  ">
                      {/* <p class="comman_para">Manage your display name, username and email id withCrafty..</p> */}
                      <button
                        type="button"
                        className="btn register_btn text-white w-100"
                        onClick={updateFetchData}
                      >
                        Update Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade current_plan_tab"
              id="pills-subscriptons"
              role="tabpanel"
              aria-labelledby="pills-subscriptons-tab"
              tabIndex={0}
            >
              {/* =============== CURRENT PLAN START ================ */}
              <CurrentPlan userSubscription={currentPlan} />
              {/* ==========CURRENT-PLAN-INNER START ================ */}
            </div>
          </div>
        </div>
        {isLoading && (
          <main className="main">
            <span className="loader"></span>
          </main>
        )}
      </section>
    </>
  );
}
