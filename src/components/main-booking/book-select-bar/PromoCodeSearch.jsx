import { faCheckCircle, faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomerContext } from "../../../providers/CustomerContext";
import { fetchPromoCodeAction } from "../../../stores/slices/promoCode.slice";

export const PromoCodeSearch = () => {
  const { promoCode, setPromoCode } = useContext(CustomerContext);
  const [inputPromo, setInputPromo] = useState("");
  const [changeInput, setChangeInput] = useState(true);

  const promoCodeState = useSelector((state) => state.promoCode.promoCodeState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPromoCodeAction());
  }, []);

  const onChangeInput = (e) => {
    setInputPromo(e.target.value);
  };

  const handleApplyCode = () => {
    let exitPromoCode = promoCodeState.data.find(
      (code) => code.codeName === inputPromo
    );
    if (exitPromoCode) {
      setPromoCode(exitPromoCode);
    } else {
      setPromoCode({ codeName: "", description: "", value: 0, id: 0 });
    }
    setChangeInput(true);
  };

  useEffect(() => {
    setChangeInput(false);
  }, [inputPromo]);

  let exitPromoCode = promoCodeState.data.find(
    (code) => code.codeName === promoCode.codeName
  );

  return (
    <div>
      <div className="select-rooms">
        <div className="search-select">
          <label className="search-label" htmlFor="">
            Have a promo code?
          </label>
          <div className="search-input search-promo">
            <form>
              <Input
                allowClear
                className="input-promo"
                placeholder="Enter promo code"
                onChange={onChangeInput}
              />
              <Button
                disabled={inputPromo === ""}
                type="primary"
                onClick={handleApplyCode}
                ghost
                className={`option-add-room-btn apply-btn  ${
                  inputPromo === "" ? "disable" : ""
                }`}
              >
                Apply
              </Button>
              <span>
                &nbsp;
                {!changeInput ? (
                  ""
                ) : exitPromoCode ? (
                  <span>
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="icon-check"
                    />{" "}
                    <b>{promoCode.description}</b>
                  </span>
                ) : (
                  <span className="warning-info">
                    <FontAwesomeIcon icon={faWarning} /> <b>Invalid</b>
                  </span>
                )}
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
