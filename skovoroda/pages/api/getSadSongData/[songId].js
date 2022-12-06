// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { SkovorodaSad } from "../../../lib/data/skovorodaSad";

export default async function handler(req, res) {

  const { songId } = req.query;

  const sad = await SkovorodaSad();

  const sadData = sad.array.find(x => x.id === "pisnya-"+songId)

  res.status(200).json({ sadData: sadData });
}
