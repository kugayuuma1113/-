import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import styles from "./index.module.css";
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ThreeDRotation from '@mui/icons-material/ThreeDRotation';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


 
// getServerSidePropsから渡されるpropsの型
type Props = {
  initialImageUrl: string;
};
 
// ページコンポーネント関数にpropsを受け取る引数を追加する
const IndexPage: NextPage<Props> = ({ initialImageUrl }) => {
  const [imageUrl, setImageUrl] = useState(initialImageUrl); // 初期値を渡す
  const [loading, setLoading] = useState(false); // 初期状態はfalseにしておく
  // useEffect(() => {
  //   fetchImage().then((newImage) => {
  //     setImageUrl(newImage.url);
  //     setLoading(false);
  //   });
  // }, []);
  const handleClick = async () => {
    setLoading(true);
    const newImage = await fetchImage();
    setImageUrl(newImage.url);
    setLoading(false);
  };
  return (
    <div className={styles.page}>
      <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      </ThemeProvider>
          <SearchIcon fontSize="large" />
          <Typography variant="h4">自分好みの猫を探そう！！</Typography>
      <button onClick={handleClick} className={styles.button}>
        他のにゃんこも見る
      </button>
      <div className={styles.frame}>
        {loading || <img src={imageUrl} className={styles.frame} />}
      </div>
    </div>
  );
};
export default IndexPage;
 
// サーバーサイドで実行する処理
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const image = await fetchImage();
  return {
    props: {
      initialImageUrl: image.url,
    },
  };
};
 
type Image = {
  url: string;
};
const fetchImage = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log(images);
  return images[0];
};