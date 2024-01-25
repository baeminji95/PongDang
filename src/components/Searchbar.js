import { useEffect, useState } from "react";
import { Map, MapMarker, useMap } from "react-kakao-maps-sdk";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "../index.css";
import { Pagination } from "swiper/modules";

import { YYYYMMDD } from "../App";
import { hh } from "../App";
import Spinner from "./Spinner";

export default function SearchBar() {
  const [selectLocal, setSelectLocal] = useState([]);
  const [beachNum, setBeachNum] = useState();
  const [beachName, setBeachName] = useState();
  const [nx, setNx] = useState(null);
  const [ny, setNy] = useState(null);
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();

  const [bookmarks, setBookmarks] = useState(false);
  const [seedBeachs, setSeedbeachs] = useState(
    JSON.parse(localStorage.getItem("seedBeachs"))
  );
  const bookmarkedBeachs = seedBeachs.filter(
    (beach) => beach.bookmark === true
  );

  // 키 스테이트 추적
  console.log(beachNum);

  // 즐겨찾기 버튼
  function toggleBookmarked(beachNum) {
    const updatedBeachs = seedBeachs.map((beach) => {
      // 전달받은 beachnum과 일치하는 BEACHS.num의 bookmark를 업데이트한다.
      if (beach.num.toString() === beachNum) {
        return { ...beach, bookmark: !beach.bookmark };
      }
      // 나머지 배열들은 그대로 둔다
      return beach;
    });

    localStorage.setItem("seedBeachs", JSON.stringify(updatedBeachs));
    setSeedbeachs(updatedBeachs);
  }

  const locals = [
    {
      value: "InCheon",
      name: "인천",
      beaches: seedBeachs.filter((beach) => beach.region === "인천"),
    },
    {
      value: "GangWon",
      name: "강원",
      beaches: seedBeachs.filter((beach) => beach.region === "강원"),
    },
    {
      value: "JeJu",
      name: "제주",
      beaches: seedBeachs.filter((beach) => beach.region === "제주"),
    },
    {
      value: "PuSan",
      name: "부산",
      beaches: seedBeachs.filter((beach) => beach.region === "부산"),
    },
  ];

  function handleLocalSelect(e) {
    if (e.target.value !== "none") {
      setSelectLocal(
        locals.find((select) => select.value === e.target.value).beaches
      );
    }
  }
  function handleBeachSelect(e) {
    if (e.target.value !== "none") {
      setBeachNum(e.target.value);
      setNx(
        seedBeachs.find((beach) => beach.num.toString() === e.target.value).nx
      );
      setNy(
        seedBeachs.find((beach) => beach.num.toString() === e.target.value).ny
      );
    }
  }

  const [wh, setWh] = useState();
  const [forecast, setForecast] = useState();
  const [wt, setWt] = useState();
  const [temperatures, setTemperatures] = useState();
  const [vilageFcst, setVilageFcst] = useState();
  const [alldayWt, setAlldayWt] = useState();
  const [alldayWh, setAlldayWh] = useState();

  const [chartInfo, setChartInfo] = useState([]);
  //로딩화면
  const [loading, setLoading] = useState(false);

  // 키 스테이트 추적
  // console.log(wh)
  // console.log(forecast)
  // console.log(wt)
  // console.log(temperatures)
  // console.log(vilageFcst)
  // console.log(alldayWt)
  // console.log(alldayWh)
  // console.log(chartInfo)
  // console.log(loading)

  if (alldayWt && vilageFcst && alldayWh && chartInfo.length === 0) {
    setChartInfo([
      {
        name: "03:00",
        수온: alldayWt[0]
          ? Number(alldayWt[0].response.body.items.item[0].tw)
          : null,
        파고: alldayWh[0]
          ? Number(alldayWh[0].response.body.items.item[0].wh)
          : null,
        기온: Number(vilageFcst.response.body.items.item[0].fcstValue),
      },
      {
        name: "06:00",
        수온: alldayWt[1]
          ? Number(alldayWt[1].response.body.items.item[0].tw)
          : null,
        파고: alldayWh[1]
          ? Number(alldayWh[1].response.body.items.item[0].wh)
          : null,
        기온: Number(vilageFcst.response.body.items.item[36].fcstValue),
      },
      {
        name: "09:00",
        수온: alldayWt[2]
          ? Number(alldayWt[2].response.body.items.item[0].tw)
          : null,
        파고: alldayWh[2]
          ? Number(alldayWh[2].response.body.items.item[0].wh)
          : null,
        기온: Number(vilageFcst.response.body.items.item[73].fcstValue),
      },
      {
        name: "12:00",
        수온: alldayWt[3]
          ? Number(alldayWt[3].response.body.items.item[0].tw)
          : null,
        파고: alldayWh[3]
          ? Number(alldayWh[3].response.body.items.item[0].wh)
          : null,
        기온: Number(vilageFcst.response.body.items.item[109].fcstValue),
      },
      {
        name: "15:00",
        수온: alldayWt[4]
          ? Number(alldayWt[4].response.body.items.item[0].tw)
          : null,
        파고: alldayWh[4]
          ? Number(alldayWh[4].response.body.items.item[0].wh)
          : null,
        기온: Number(vilageFcst.response.body.items.item[145].fcstValue),
      },
      {
        name: "18:00",
        수온: alldayWt[5]
          ? Number(alldayWt[5].response.body.items.item[0].tw)
          : null,
        파고: alldayWh[5]
          ? Number(alldayWh[5].response.body.items.item[0].wh)
          : null,
        기온: Number(vilageFcst.response.body.items.item[182].fcstValue),
      },
      {
        name: "21:00",
        수온: alldayWt[6]
          ? Number(alldayWt[6].response.body.items.item[0].tw)
          : null,
        파고: alldayWh[6]
          ? Number(alldayWh[6].response.body.items.item[0].wh)
          : null,
        기온: Number(vilageFcst.response.body.items.item[218].fcstValue),
      },
      {
        name: "24:00",
        수온: alldayWt[7]
          ? Number(alldayWt[7].response.body.items.item[0].tw)
          : null,
        파고: alldayWh[7]
          ? Number(alldayWh[7].response.body.items.item[0].wh)
          : null,
        기온: Number(vilageFcst.response.body.items.item[254].fcstValue),
      },
    ]);
  }

  async function getInfo() {
    setLoading(true);
    setWh(null);
    setWt(null);
    setForecast(null);
    setTemperatures(null);
    setChartInfo(null);

    //지도용 변수
    setBeachName(
      seedBeachs.find((beach) => beach.num.toString() === beachNum).name
    );
    setLat(seedBeachs.find((beach) => beach.num.toString() === beachNum).lat);
    setLng(seedBeachs.find((beach) => beach.num.toString() === beachNum).lng);
    setBookmarks(
      seedBeachs.find((beach) => beach.num.toString() === beachNum).bookmark
    );

    //파고
    function whUrl(hh) {
      let whUrl =
        "https://apis.data.go.kr/1360000/BeachInfoservice/getWhBuoyBeach";
      // query
      whUrl += `?serviceKey=` + process.env.REACT_APP_API_KEY;
      whUrl += "&numOfRows=10";
      whUrl += "&pageNo=1";
      whUrl += "&dataType=JSON";
      whUrl += `&beach_num=${beachNum}`;
      whUrl += `&searchTime=${YYYYMMDD}${hh}00`;
      return whUrl;
    }

    //초단기
    let forecastUrl =
      "https://apis.data.go.kr/1360000/BeachInfoservice/getUltraSrtFcstBeach";
    //query
    forecastUrl += `?serviceKey=` + process.env.REACT_APP_API_KEY;
    forecastUrl += "&numOfRows=10";
    forecastUrl += "&pageNo=1";
    forecastUrl += "&dataType=JSON";
    forecastUrl += `&base_date=${YYYYMMDD}`;
    forecastUrl += `&base_time=${hh}00`;
    forecastUrl += `&beach_num=${beachNum}`;

    //수온
    function wtUrl(hh) {
      let wtUrl =
        "https://apis.data.go.kr/1360000/BeachInfoservice/getTwBuoyBeach";
      //query
      wtUrl += `?serviceKey=` + process.env.REACT_APP_API_KEY;
      wtUrl += "&numOfRows=1";
      wtUrl += "&pageNo=10";
      wtUrl += "&dataType=JSON";
      wtUrl += `&beach_num=${beachNum}`;
      wtUrl += `&searchTime=${YYYYMMDD}${hh}00`;
      return wtUrl;
    }

    //기온 /동네예보 초단기 실황
    let temperaturesUrl =
      "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst";
    //query
    temperaturesUrl += `?serviceKey=` + process.env.REACT_APP_API_KEY;
    temperaturesUrl += "&pageNo=1";
    temperaturesUrl += "&numOfRows=1000";
    temperaturesUrl += "&dataType=JSON";
    temperaturesUrl += `&base_date=${YYYYMMDD}`;
    temperaturesUrl += `&base_time=${hh}00`;
    temperaturesUrl += `&nx=${nx}`;
    temperaturesUrl += `&ny=${ny}`;

    //기온 /동네예보 단기 예보
    let vilageFcstUrl =
      "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";
    //query
    vilageFcstUrl += `?serviceKey=` + process.env.REACT_APP_API_KEY;
    vilageFcstUrl += "&pageNo=1";
    vilageFcstUrl += "&numOfRows=1000";
    vilageFcstUrl += "&dataType=JSON";
    vilageFcstUrl += `&base_date=${YYYYMMDD}`;
    vilageFcstUrl += `&base_time=0200`;
    vilageFcstUrl += `&nx=${nx}`;
    vilageFcstUrl += `&ny=${ny}`;

    try {
      const res1 = await fetch(whUrl(hh), {});
      const res2 = await fetch(forecastUrl, {});
      const res3 = await fetch(wtUrl(hh), {});
      const res4 = await fetch(temperaturesUrl, {});
      const res5 = await fetch(vilageFcstUrl, {});

      setWh(await res1.json());
      setForecast(await res2.json());
      setWt(await res3.json());
      setTemperatures(await res4.json());
      setVilageFcst(await res5.json());

      //차트용
      if (hh < 3) {
        const resA = await fetch(wtUrl("00"), {});

        const res1 = await fetch(whUrl("00"), {});

        setAlldayWt([await resA.json()]);
        setAlldayWh([await res1.json()]);
      } else if (hh < 6) {
        const resA = await fetch(wtUrl("00"), {});
        const resB = await fetch(wtUrl("03"), {});

        const res1 = await fetch(whUrl("00"), {});
        const res2 = await fetch(whUrl("03"), {});

        setAlldayWt([await resA.json(), await resB.json()]);
        setAlldayWh([await res1.json(), await res2.json()]);
      } else if (hh < 9) {
        const resA = await fetch(wtUrl("00"), {});
        const resB = await fetch(wtUrl("03"), {});
        const resC = await fetch(wtUrl("06"), {});

        const res1 = await fetch(whUrl("00"), {});
        const res2 = await fetch(whUrl("03"), {});
        const res3 = await fetch(whUrl("06"), {});

        setAlldayWt([await resA.json(), await resB.json(), await resC.json()]);
        setAlldayWh([await res1.json(), await res2.json(), await res3.json()]);
      } else if (hh < 12) {
        const resA = await fetch(wtUrl("00"), {});
        const resB = await fetch(wtUrl("03"), {});
        const resC = await fetch(wtUrl("06"), {});
        const resD = await fetch(wtUrl("09"), {});

        const res1 = await fetch(whUrl("00"), {});
        const res2 = await fetch(whUrl("03"), {});
        const res3 = await fetch(whUrl("06"), {});
        const res4 = await fetch(whUrl("09"), {});

        setAlldayWt([
          await resA.json(),
          await resB.json(),
          await resC.json(),
          await resD.json(),
        ]);
        setAlldayWh([
          await res1.json(),
          await res2.json(),
          await res3.json(),
          await res4.json(),
        ]);
      } else if (hh < 15) {
        const resA = await fetch(wtUrl("00"), {});
        const resB = await fetch(wtUrl("03"), {});
        const resC = await fetch(wtUrl("06"), {});
        const resD = await fetch(wtUrl("09"), {});
        const resE = await fetch(wtUrl("12"), {});

        const res1 = await fetch(whUrl("00"), {});
        const res2 = await fetch(whUrl("03"), {});
        const res3 = await fetch(whUrl("06"), {});
        const res4 = await fetch(whUrl("09"), {});
        const res5 = await fetch(whUrl("12"), {});

        setAlldayWt([
          await resA.json(),
          await resB.json(),
          await resC.json(),
          await resD.json(),
          await resE.json(),
        ]);
        setAlldayWh([
          await res1.json(),
          await res2.json(),
          await res3.json(),
          await res4.json(),
          await res5.json(),
        ]);
      } else if (hh < 18) {
        const resA = await fetch(wtUrl("00"), {});
        const resB = await fetch(wtUrl("03"), {});
        const resC = await fetch(wtUrl("06"), {});
        const resD = await fetch(wtUrl("09"), {});
        const resE = await fetch(wtUrl("12"), {});
        const resF = await fetch(wtUrl("15"), {});

        const res1 = await fetch(whUrl("00"), {});
        const res2 = await fetch(whUrl("03"), {});
        const res3 = await fetch(whUrl("06"), {});
        const res4 = await fetch(whUrl("09"), {});
        const res5 = await fetch(whUrl("12"), {});
        const res6 = await fetch(whUrl("15"), {});

        setAlldayWt([
          await resA.json(),
          await resB.json(),
          await resC.json(),
          await resD.json(),
          await resE.json(),
          await resF.json(),
        ]);
        setAlldayWh([
          await res1.json(),
          await res2.json(),
          await res3.json(),
          await res4.json(),
          await res5.json(),
          await res6.json(),
        ]);
      } else if (hh < 21) {
        const resA = await fetch(wtUrl("00"), {});
        const resB = await fetch(wtUrl("03"), {});
        const resC = await fetch(wtUrl("06"), {});
        const resD = await fetch(wtUrl("09"), {});
        const resE = await fetch(wtUrl("12"), {});
        const resF = await fetch(wtUrl("15"), {});
        const resG = await fetch(wtUrl("18"), {});

        const res1 = await fetch(whUrl("00"), {});
        const res2 = await fetch(whUrl("03"), {});
        const res3 = await fetch(whUrl("06"), {});
        const res4 = await fetch(whUrl("09"), {});
        const res5 = await fetch(whUrl("12"), {});
        const res6 = await fetch(whUrl("15"), {});
        const res7 = await fetch(whUrl("18"), {});

        setAlldayWt([
          await resA.json(),
          await resB.json(),
          await resC.json(),
          await resD.json(),
          await resE.json(),
          await resF.json(),
          await resG.json(),
        ]);
        setAlldayWh([
          await res1.json(),
          await res2.json(),
          await res3.json(),
          await res4.json(),
          await res5.json(),
          await res6.json(),
          await res7.json(),
        ]);
      } else if (hh <= 24) {
        const resA = await fetch(wtUrl("00"), {});
        const resB = await fetch(wtUrl("03"), {});
        const resC = await fetch(wtUrl("06"), {});
        const resD = await fetch(wtUrl("09"), {});
        const resE = await fetch(wtUrl("12"), {});
        const resF = await fetch(wtUrl("15"), {});
        const resG = await fetch(wtUrl("18"), {});
        const resH = await fetch(wtUrl("21"), {});

        const res1 = await fetch(whUrl("00"), {});
        const res2 = await fetch(whUrl("03"), {});
        const res3 = await fetch(whUrl("06"), {});
        const res4 = await fetch(whUrl("09"), {});
        const res5 = await fetch(whUrl("12"), {});
        const res6 = await fetch(whUrl("15"), {});
        const res7 = await fetch(whUrl("18"), {});
        const res8 = await fetch(whUrl("21"), {});

        setAlldayWt([
          await resA.json(),
          await resB.json(),
          await resC.json(),
          await resD.json(),
          await resE.json(),
          await resF.json(),
          await resG.json(),
          await resH.json(),
        ]);
        setAlldayWh([
          await res1.json(),
          await res2.json(),
          await res3.json(),
          await res4.json(),
          await res5.json(),
          await res6.json(),
          await res7.json(),
          await res8.json(),
        ]);
      }

      //차트데이터 초기화
      setChartInfo([]);
    } catch (error) {
      throw new Error(error);
    }
  }

  const EventMarkerContainer = ({ position, content }) => {
    const map = useMap();
    const [isVisible, setIsVisible] = useState(false);

    const handleMarkerClick = (marker) => {
      map.setLevel(5);
      map.panTo(marker.getPosition());
      setIsVisible(true);

      const clickedBeach = seedBeachs.find((beach) => beach.name === content);

      setBeachNum(clickedBeach.num.toString());
    };

    return (
      <MapMarker
        position={position} // 마커를 표시할 위치
        onMouseOver={() => setIsVisible(true)}
        onMouseOut={() => setIsVisible(false)}
        onClick={(marker) => handleMarkerClick(marker)}
      >
        {isVisible && (
          <div className="font-semibold text-blue-500">{content}</div>
        )}
      </MapMarker>
    );
  };

  useEffect(() => {
    if (beachNum) {
      getInfo();
    }
  }, [beachNum]);

  return (
    <>
      {/* 지역, 해변 선택 */}
      <div className="w-[90%] max-w-[35rem] xl:w-[60rem] mx-auto border border-white rounded-full bg-blue-950/30 gap-5 px-4 py-3 hover:bg-blue-950/50">
        <div className="flex">
          <select
            className="w-[20%] font-bold text-[1.1rem] md:text-[1.3rem] xl:text-[1.5rem] text-white bg-inherit outline-none"
            onChange={handleLocalSelect}
          >
            <option value="none" className="text-[#000] ">
              지역
            </option>
            {locals.map((local) => (
              <option
                className="text-[#000]"
                key={local.value}
                value={local.value}
              >
                {local.name}
              </option>
            ))}
          </select>
          <div className="w-[1px] mx-3 bg-white "></div>
          <select
            className="w-[80%] font-bold text-[1.1rem] md:text-[1.3rem] xl:text-[1.5rem] text-white bg-inherit outline-none"
            onChange={handleBeachSelect}
          >
            <option value="none" className="text-[#000]">
              어느 해변으로 갈까요?
            </option>
            {selectLocal.map((beach) => (
              <option className="text-[#000]" key={beach.num} value={beach.num}>
                {beach.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 즐겨찾기 리스트 */}
      <div className="w-[100%] h-[3rem] bg-blue-950/30 mt-3 hover:cursor-pointer">
        {bookmarkedBeachs.length === 0 ? (
          <span className="flex leading-[3rem] justify-center font-semibold text-white px-1 xl:text-[1.2rem]">
            즐겨찾기를 추가해 주세요.
          </span>
        ) : (
          <>
            <Swiper
              slidesPerView="auto"
              spaceBetween={30}
              grabCursor={true}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {bookmarkedBeachs.map((beach) => (
                <SwiperSlide>
                  <button
                    className="font-semibold text-white px-1
            hover:text-yellow-500 hover:outline min-w-[8rem]"
                    value={beach.num}
                    onClick={handleBeachSelect}
                  >
                    {beach.name}
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
      </div>

      {wh && wt && forecast && temperatures ? (
        <div
          className="w-[90%] mx-auto my-5 border rounded-[3rem] bg-blue-950/30 px-8 py-4 pb-8  
        "
        >
          <p className="relative border-b font-semibold pl-4 my-3 text-white text-[1.8rem] xl:text-[2.5rem]">
            {beachName}
            {/* 즐겨찾기 버튼 */}
            <button
              onClick={() => {
                setBookmarks(!bookmarks);
                toggleBookmarked(beachNum);
              }}
            >
              <svg
                style={{ fill: bookmarks ? "orange" : "#999" }}
                className="absolute fill-[#999] h-7 w-7 bottom-2 right-0 
              md:w-9 md:h-9
              lg:w-11 lg:h-11"
                xmlns="https://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
              </svg>
            </button>
          </p>

          <div className="w-[100%] flex justify-center">
            {nx && ny && (
              <div className="w-[100%] grow">
                <Map
                  className="h-[15rem] lg:h-[20rem] xl:h-[30rem] border-4"
                  center={{ lat: lat, lng: lng }}
                >
                  {seedBeachs.map((value) => (
                    <EventMarkerContainer
                      onClick={handleBeachSelect}
                      key={`EventMarkerContainer-${value.lat}-${value.lng}`}
                      position={{ lat: value.lat, lng: value.lng }}
                      content={value.name}
                    ></EventMarkerContainer>
                  ))}
                </Map>
              </div>
            )}

            {/* 예보 */}

            <div className="w-[10rem] xl:w-[12rem] xl:mx-8 flex flex-col justify-between my-3 ml-5 xl:pl-3">
              {forecast.response.body.items.item[8].fcstValue === "0" ? (
                <p className="text-[4.5rem] relative xl:text-[8rem]">
                  ☀
                  <span className="absolute top-2 left-0 text-white text-[1.2rem] xl:text-[2rem] font-bold drop-shadow-md">
                    맑음
                  </span>
                </p>
              ) : forecast.response.body.items.item[8].fcstValue === "1" || "2" ? (
                <p className="text-[4.5rem] relative xl:text-[8rem]">
                  🌧
                  <span className="absolute top-2 left-0 text-white text-[1rem] font-bold">
                    비
                  </span>
                </p>
              ) : (
                <p className="text-[4.5rem] relative xl:text-[8rem]">
                  🌨️
                  <span className="absolute top-2 left-0 text-white text-[1rem] font-bold">
                    눈
                  </span>
                </p>
              )}

              <p className=" text-white font-semibold lg:text-[1.3rem] xl:text-[1.8rem]">
                기온: {temperatures.response.body.items.item[3].obsrValue}℃
              </p>

              <p className="text-white font-semibold lg:text-[1.3rem] xl:text-[1.8rem]">
                풍속: {temperatures.response.body.items.item[7].obsrValue}m/s
              </p>

              <p className=" text-white font-semibold lg:text-[1.3rem] xl:text-[1.8rem]">
                파고: {wh.response.body.items.item[0].wh}m
              </p>

              <p className=" text-white font-semibold lg:text-[1.3rem] xl:text-[1.8rem]">
                수온: {wt.response.body.items.item[0].tw}℃
              </p>
            </div>
          </div>

          {/* 차트 */}
          <div>
            {/* 수온 */}
            <ResponsiveContainer
              width="95%"
              height={300}
              className="relative bg-blue-950/30 mx-auto mt-10"
            >
              <LineChart
                width={500}
                height={300}
                data={chartInfo}
                margin={{
                  top: 20,
                  right: 40,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#0df" />
                <YAxis
                  type="number"
                  stroke="#0df"
                  domain={["dataMin", "dataMax"]}
                />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="수온" stroke="#0df" />
              </LineChart>
              {!chartInfo ? 
              <div className="w-[10rem] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"><Spinner className="w-32" /></div>:<></>}
            </ResponsiveContainer>
            {/* 기온 */}
            <ResponsiveContainer
              width="95%"
              height={300}
              className="bg-blue-950/30 mx-auto mt-10 relative"
            >
              <LineChart
                width={500}
                height={300}
                data={chartInfo}
                margin={{
                  top: 20,
                  right: 40,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#f69" />
                <YAxis
                  type="number"
                  stroke="#f69"
                  domain={["dataMin-1", "dataMax+1"]}
                  tickCount={6}
                />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="기온" stroke="#f69" />
              </LineChart>
              {!chartInfo ? 
              <div className="w-[10rem] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"><Spinner className="w-32" /></div>:<></>}
            </ResponsiveContainer>
            {/* 파고 */}
            <ResponsiveContainer
              width="95%"
              height={300}
              className="bg-blue-950/30 mx-auto mt-10 relative"
            >
              <LineChart
                width={500}
                height={300}
                data={chartInfo}
                margin={{
                  top: 20,
                  right: 40,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#0da" />
                <YAxis
                  type="number"
                  stroke="#0da"
                  domain={["dataMin", "dataMax"]}
                  tickCount={6}
                />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="파고" stroke="#0da" />
              </LineChart>
              {!chartInfo ? 
              <div className="w-[10rem] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"><Spinner className="w-32" /></div>:<></>}
            </ResponsiveContainer>
          </div>
        </div>
      ) : loading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
