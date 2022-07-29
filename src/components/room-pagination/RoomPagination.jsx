import { Pagination } from "antd";
import React, { useMemo } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRoomPaginationAction,
  ROOM_LIMIT,
} from "../../stores/slices/roomPagination.slice";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getParamValue, paramValueToUrlParam } from "../../utils/urlParamUtils";

export const RoomPagination = React.memo(function _RoomPagination() {
  const roomPaginationState = useSelector(
    (state) => state.roomPagination.roomPaginationState
  );
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [searchParams, set] = useSearchParams()

  const paramValue = useMemo(
    () => getParamValue(params.params),
    [params.params]
  );

  const pageParams = +(paramValue?.page ?? 1);
  const limitParams = +(paramValue?.limit ?? ROOM_LIMIT);

  console.log(paramValue);

  const total = roomPaginationState.pagination.total;
  const loading = roomPaginationState.loading;

  useEffect(() => {
    try {
      dispatch(
        fetchRoomPaginationAction({ page: pageParams, limit: limitParams })
      );
    } catch (error) {
      dispatch(fetchRoomPaginationAction({ page: 1, limit: ROOM_LIMIT }));
    }
  }, [dispatch, limitParams, pageParams]);

  const onPaginationChange = (page, limit) => {
    try {
      const urlParam = paramValueToUrlParam({ page, limit });
      navigate(`/roompagination/${urlParam}`, { replace: true });
    } catch (error) {}
  };

  return (
    <div className="home-page">
      <h1>Room Pagination Listing</h1>
      {loading && (
        <div>
          <LoadingOutlined />
        </div>
      )}
      {roomPaginationState.data.map((item) => (
        <div key={item.id} className="RoomPagination-item">
          {item.typeRoom} &nbsp; {item.price}
        </div>
      ))}
      <Pagination
        onChange={onPaginationChange}
        pageSize={+limitParams}
        current={+pageParams}
        total={total}
      />
    </div>
  );
});
