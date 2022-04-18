import type { NextPage } from "next";
import { ChangeEvent, FormEvent, useState } from "react";

const Home: NextPage = () => {
  const [url, setUrl] = useState<string>("");
  const [ogp, setOgp] = useState<any>({});

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("/api/ogp", {
      method: "POST",
      body: JSON.stringify({ url }),
    });
    const json = await response.json();
    setOgp(json);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <fieldset>
          <legend>Get OGP</legend>
          <div>
            <label htmlFor="url">URL:</label>
            <input type="url" name="url" id="url" value={url} onChange={onChange} />
          </div>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
      <div>
        <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(ogp)}</pre>
      </div>
    </div>
  );
};

export default Home;
