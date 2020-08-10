interface SysConfig {
  baseUrl: string;
  pagenation: PagenationConfig;
}

interface PagenationConfig {
  rows: number;
  page: number;
}

const config: SysConfig = {
  baseUrl: "https://car.zhuohang.tech/index.php/api",
  pagenation: {
    rows: 15,
    page: 1
  }
};

export default config;
