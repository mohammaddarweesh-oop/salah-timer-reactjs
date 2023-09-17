import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Prayer from "./Prayer";
import asr from "./../Images/asr-prayer-mosque.png";
import dhhr from "./../Images/dhhr-prayer-mosque.png";
import fajr from "./../Images/fajr-prayer.png";
import night from "./../Images/night-prayer-mosque.png";
import sunset from "./../Images/sunset-prayer-mosque.png";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import "moment/dist/locale/ar-dz";
moment.locale("ar-dz");

function MainContent() {
  const [remaining, setRemaining] = useState("");
  const [today, setToday] = useState("");
  // const [id, setId] = useState("");
  const [nextIndexPrayers, setNextIndexPrayers] = useState(0);
  const [timengs, setTimengs] = useState({
    Fajr: "04:59",
    Dhuhr: "13:04",
    Asr: "16:36",
    Maghrib: "19:34",
    Isha: "21:10",
  });
  const prayers = [
    {
      apiName: "Fajr",
      displayName: "الفجر",
    },
    {
      apiName: "Dhuhr",
      displayName: "الظهر",
    },
    {
      apiName: "Asr",
      displayName: "العصر",
    },
    {
      apiName: "Maghrib",
      displayName: "المغرب",
    },
    {
      apiName: "Isha",
      displayName: "العشاء",
    },
  ];

  const avilableCities = [
    {
      displayName: "عمان",
      apiName: "Amman",
    },
    {
      displayName: "إربد",
      apiName: "Irbid",
    },
    {
      displayName: "السلط",
      apiName: "salt",
    },
    {
      displayName: "الزرقاء",
      apiName: "Zarqa",
    },
    {
      displayName: "سحاب",
      apiName: "Sahab",
    },
    {
      displayName: "الرمثا",
      apiName: "Ramtha",
    },
    {
      displayName: "مادبا",
      apiName: "Madaba",
    },
    {
      displayName: "الأزرق",
      apiName: "Al-azraq",
    },
    {
      displayName: "الطفيلة",
      apiName: "Tafila",
    },
    {
      displayName: "معان",
      apiName: "Ma'an",
    },
    {
      displayName: "عجلون",
      apiName: "Ajloun",
    },
    {
      displayName: "جرش",
      apiName: "Jerash",
    },
  ];
  const [city, setCity] = useState({
    displayName: "عمان",
    apiName: "Amman",
  });
  const getTiming = async () => {
    const response = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?city=${city.apiName}&country=JO`
    );
    // console.log("timing is ",  response.data.data.timings);
    setTimengs(response.data.data.timings);
    // setId(response.data.data.meta.method.id);
  };
  const setUpCountdownTimer = () => {
    const momentNow = moment();

    let nextPrayer = null;
    if (
      momentNow.isAfter(moment(timengs["Fajr"], "hh:mm")) &&
      momentNow.isBefore(moment(timengs["Dhuhr"], "hh:mm"))
    ) {
      nextPrayer = 1;
    } else if (
      momentNow.isAfter(moment(timengs["Dhuhr"], "hh:mm")) &&
      momentNow.isBefore(moment(timengs["Asr"], "hh:mm"))
    ) {
      nextPrayer = 2;
    } else if (
      momentNow.isAfter(moment(timengs["Asr"], "hh:mm")) &&
      momentNow.isBefore(moment(timengs["Maghrib"], "hh:mm"))
    ) {
      nextPrayer = 3;
    } else if (
      momentNow.isAfter(moment(timengs["Sunset"], "hh:mm")) &&
      momentNow.isBefore(moment(timengs["Isha"], "hh:mm"))
    ) {
      nextPrayer = 4;
    } else {
      nextPrayer = 0;
    }
    setNextIndexPrayers(nextPrayer);
    //
    const nextPrayerObject = prayers[nextPrayer];
    const nextPrayerTimer = timengs[nextPrayerObject.apiName];
    let remainingTime = moment(nextPrayerTimer, "hh:mm").diff(momentNow);

    const nextPrayerTimeMoment = moment(nextPrayerTimer, "hh:mm");
    if (remainingTime < 0) {
      const midNightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
      const fajrToMidNight = nextPrayerTimeMoment.diff(
        moment("00:00:00", "hh:mm:ss")
      );
      const totalRef = fajrToMidNight + midNightDiff;
      remainingTime = totalRef;
    }

    const duration = moment.duration(remainingTime);
    setRemaining(
      `${duration.hours()}:${duration.minutes()}:${duration.seconds()}`
    );
  };

  useEffect(() => {
    console.log("Side Effect");
    getTiming();
  }, [city]);

  useEffect(() => {
    const tim = moment();
    setToday(tim.format("MMM Do YYYY | hh:mm"));

    let inte = setInterval(() => {
      setUpCountdownTimer();
    }, 1000);

    return () => {
      clearInterval(inte);
    };
  }, [timengs]);

  const handleCityChange = (event) => {
    const cityObj = avilableCities.find((city) => {
      return city.apiName == event.target.value;
    });
    setCity(cityObj);
  };

  return (
    <>
      <Grid container>
        <Grid xs={6}>
          <div>
            <h2> {today} </h2>
            <h1>{city.displayName}</h1>
          </div>
        </Grid>

        <Grid xs={6}>
          <div>
            <h2> متبقي حتى صلاة {prayers[nextIndexPrayers].displayName} </h2>
            <h1>{remaining}</h1>
          </div>
        </Grid>
      </Grid>
      <Divider style={{ borderColor: "white", opacity: "0.3" }} />

      {/* ================================== Start cards ================================== */}

      <Stack
        direction="row"
        justifyContent="space-around"
        flexWrap="nowrap"
        style={{ marginTop: "50px" }}
      >
        <Prayer title="الفجر" src={fajr} time={timengs.Fajr} />
        <Prayer title="الظهر" src={dhhr} time={timengs.Dhuhr} />
        <Prayer title="العصر" src={asr} time={timengs.Asr} />
        <Prayer title="المغرب" src={sunset} time={timengs.Sunset} />
        <Prayer title="العشاء" src={night} time={timengs.Isha} />
      </Stack>
      {/* ================================== End cards ==================================== */}
      {/* ================================== Start Select ==================================== */}
      <Stack direction="row" justifyContent={"center"} alignItems={"center"}>
        <FormControl style={{ marginTop: "30px", width: "20%" }}>
          <InputLabel id="demo-simple-select-label">المدينة</InputLabel>
          <Select
            style={{ color: "white" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            // value={age}
            onChange={handleCityChange}
          >
            {avilableCities.map((element) => {
              return (
                <MenuItem value={element.apiName} key={element.apiName}>
                  {element.displayName}
                </MenuItem>
              );
            })}

            {/* <MenuItem value={"Zarqa"}>الزرقاء</MenuItem>
            <MenuItem value={"العقبة"}>العقبة</MenuItem>
            <MenuItem value={"معان"}>معان</MenuItem>
            <MenuItem value={"الطفيلة"}>الطفيلة</MenuItem>
            <MenuItem value={"جرش"}>جرش</MenuItem>
            <MenuItem value={"السلط"}>السلط</MenuItem>
            <MenuItem value={"الكرك"}>الكرك</MenuItem>
            <MenuItem value={"عجلون"}>عجلون</MenuItem>
            <MenuItem value={"الأزرق"}>الأزرق</MenuItem> */}
          </Select>
        </FormControl>
      </Stack>
      {/* ================================== End Select ==================================== */}
    </>
  );
}

export default MainContent;
