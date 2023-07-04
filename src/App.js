import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import CopyToClipboard from 'react-copy-to-clipboard';
import LogRocket from 'logrocket';
LogRocket.init('2soyra/realurlshortner');

function App() {
  const [isActive, setIsActive] = useState(false);

  const [longUr, setUrl] = useState('');
  const [urltext, setUrltext] = useState('');

  const handleEdit = async (e) => {
    e.preventDefault();
    setIsActive((current) => !current);

    console.log(`long url: ${longUr}`);

    axios
      .post('http://gospily-api.onrender.com/index', { longUrl: longUr })
      .then((res) => {
        const { shortUrl } = res.data;
        //const realShortUrl = shortUrl.substring(22);
        setUrltext(shortUrl);
        // console.log(`shorturl: ${shortUrl}`);
        // console.log(`realshorturl: ${realShortUrl}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <header className="header-top-strip py-3 pe-4">
        <div className="container-xxl">
          <div className="row  ">
            <div className="col-4 py-0 mb-0 pb-0 mt-1">
              <h3 className="text-red mb-0 text-center py-0">Gospily</h3>
            </div>
            <div className="col-4 d-flex justify-content-between align-items-center px-0">
              <h6 className="mb-0 px-0">why Gospily?</h6>
              <h6 className="mb-0">fancy text</h6>
              <h6 className="mb-0">Another fancy text</h6>
            </div>
            <div className="col-4 mb-0">
              <button className="mb-0 button  ms-5" href="#">
                Get Enterprise
              </button>
            </div>
          </div>
        </div>
      </header>
      <section className="home-wrapper-1 py-5">
        <div className="container-xxl">
          <div className="d-flex align-items-center flex-column mt-5">
            <h1>Links that means business</h1>
            <p>create and share trusted powerful short links</p>
          </div>
          <div
            className={
              isActive
                ? 'mt-5 d-flex align-items-center flex-column'
                : 'shorturl'
            }
          >
            <h6>Click to copy and paste in new tab</h6>
            <CopyToClipboard text={urltext}>
              <Link component="button">
                <p>{urltext}</p>
              </Link>
            </CopyToClipboard>
          </div>
        </div>
      </section>
      <section className="home-wrapper-1 py-5 mt-5 footer">
        <div className="container-xxl ">
          <div className="input-group ">
            <input
              type="text"
              className="form-control py-1"
              placeholder="Enter Long Url here.."
              aria-label="Enter Long Url here.."
              aria-describedby="basic-addon2"
              value={longUr}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button
              className="input-group-text p-2"
              id="basic-addon2"
              onClick={handleEdit}
            >
              Shorten Url
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
