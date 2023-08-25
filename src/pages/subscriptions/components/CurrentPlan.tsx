import React from "react";
import { dateFormate } from "../../../commonFunction/dateFormate";
import { consoleShow } from "../../../commonFunction/console";

export default function CurrentPlan({ userSubscription }: any) {
  consoleShow("userSubscription: ", userSubscription);
  return (
    <>
      <div className="current-plan  ">
        <h3 className="section_heading_title text-center pt-4 pb-3 mb-0">
          My Current Plan
        </h3>
        {userSubscription?.hasCurrentPlan ? (
          <div className="current-plan-card">
            <div className="row current-contact px-3 pb-3 border-bottom w-100 mx-auto align-items-center">
              <div className="logo-image mb-4">
                <img
                  src="assets/images/Icons/craftyart_logo.png"
                  alt="carftylogo"
                />
              </div>
              <div className="col-md-9 text-md-start text-center">
                <h3 className="section_title mb-4">
                  {userSubscription?.current?.package_name}
                </h3>
              </div>
              <div className="col-md-3 text-center">
                <h3 className="section_heading_title mb-4">
                  {userSubscription?.current?.amount}
                </h3>
                {/* <a href="javascript:;" className="btn register_btn text-white">
                  Active
                </a> */}
              </div>
            </div>
            <div className="row current-contact px-3 py-3 w-100 mx-auto align-items-center">
              <div className="col-md-8 text-md-start text-center">
                <h3 className="section_title mb-md-0 mb-3">
                  {dateFormate(userSubscription?.current?.billing_date)}
                  <span> Next Billing Date</span>
                </h3>
              </div>
              <div className="col-md-4 text-center">
                <h3 className="section_title mb-0">
                  {userSubscription?.current?.validity}
                </h3>
              </div>
            </div>
          </div>
        ) : (
          <div className="row current-contact px-3 pb-3 border-bottom w-100 mx-auto align-items-center">
            <p className="comman_para mb-3 mx-auto mx-md-0">
              No Current plan exist.
            </p>
          </div>
        )}
        {/* =============== INVOICES ================ */}
        {userSubscription && (
          <>
            <h3 className="section_heading_title text-center pt-4 pb-2 mb-0">
              History
            </h3>
            {userSubscription?.history === "No History exist." ? (
              <p style={{ padding: "15px " }}>{"No History exist."}</p>
            ) : (
              <div className="current-plan-card p-4">
                <div className="table-responsive">
                  <table className="table">
                    <thead className="text-center">
                      <tr>
                        <th scope="col" style={{ width: 200 }}>
                          Package Name
                        </th>
                        <th scope="col" style={{ width: 200 }}>
                          Transaction Id
                        </th>
                        <th scope="col" style={{ width: 180 }}>
                          Date
                        </th>
                        <th scope="col" style={{ width: 180 }}>
                          Amount
                        </th>
                        <th scope="col" style={{ width: 180 }}>
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {userSubscription?.hasHistory &&
                        userSubscription?.history?.map(
                          (item: any, index: any) => (
                            <>
                              <tr key={index}>
                                <td scope="row">
                                  <a
                                    href="javascript:;"
                                    className="text-decoration-none text-dark text-center"
                                  >
                                    {item?.package_name}
                                  </a>
                                </td>
                                <td>
                                  <a
                                    href="javascript:;"
                                    className="text-decoration-none text-dark text-center"
                                  >
                                    {item?.transaction_id}
                                  </a>
                                </td>
                                <td>
                                  <a
                                    href="javascript:;"
                                    className="text-decoration-none text-dark text-center"
                                  >
                                    {dateFormate(item?.purchase_date)}
                                  </a>
                                </td>
                                <td>
                                  <a
                                    href="javascript:;"
                                    className="text-decoration-none text-dark text-center"
                                  >
                                    {item?.amount}
                                  </a>
                                </td>
                                <td>
                                  <a
                                    href="javascript:;"
                                    className="text-decoration-none text-dark text-center"
                                  >
                                    {item?.status === "Active" ? (
                                      <i className="fa-solid fa-check" />
                                    ) : (
                                      <i
                                        className="fa-solid fa-xmark"
                                        style={{ color: "red" }}
                                      ></i>
                                    )}
                                  </a>
                                </td>
                              </tr>
                            </>
                          )
                        )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
