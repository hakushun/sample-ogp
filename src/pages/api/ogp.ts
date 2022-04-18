import type { NextApiRequest, NextApiResponse } from "next";
import { JSDOM } from "jsdom";

type Params = {
  url: string;
};

// https://kotsukotsu.work/tech/2020-09-13-vercel-%E3%82%A6%E3%82%A7%E3%83%96%E3%82%B5%E3%82%A4%E3%83%88%E3%81%AEogp%E6%83%85%E5%A0%B1%E3%82%92%E5%8F%96%E5%BE%97%E3%81%99%E3%82%8B-serverless-functions-%E3%82%92%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8B/
export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const body = JSON.parse(req.body) as Params;
  const { url } = body;
  const response = await fetch(url);
  const html = await response.text();
  const dom = new JSDOM(html);
  const meta = dom.window.document.querySelectorAll("head > meta");
  const ogp = Array.from(meta)
    .filter((element) => element.hasAttribute("property"))
    .reduce((pre, _ogp) => {
      const property = _ogp.getAttribute("property").trim().replace("og:", "");
      const content = _ogp.getAttribute("content");
      pre[property] = content;
      return pre;
    }, {});
  res.status(200).json(ogp);
}
