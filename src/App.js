import React, { useRef, useState } from "react";
import "./style/global.css";

import apiClient from "./services/HttpService";

function App() {
  const get_id = useRef(null);
  const get_title = useRef(null);

  const post_title = useRef(null);
  const post_description = useRef(null);

  const put_id = useRef(null);
  const put_title = useRef(null);
  const put_description = useRef(null);
  const put_published = useRef(null);

  const delete_id = useRef(null);

  const [getResult, setGetResult] = useState(null);
  const [postResult, setPostResult] = useState(null);
  const [putResult, setPutResult] = useState(null);
  const [deleteResult, setDeleteResult] = useState(null);

  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  };

  async function getAllData() {
    try {
      const res = await apiClient.get("/blogs");

      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };

      setGetResult(fortmatResponse(result));
    } catch (err) {
      setGetResult(fortmatResponse(err.response?.data || err));
    }
  }

  async function getDataById() {
    const id = get_id.current.value;

    if (id) {
      try {
        const res = await apiClient.get(`/blogs/${id}`);

        const result = {
          data: res.data,
          status: res.status,
          statusText: res.statusText,
          headers: res.headers,
        };

        setGetResult(fortmatResponse(result));
      } catch (err) {
        setGetResult(fortmatResponse(err.response?.data || err));
      }
    }
  }

  async function getDataByTitle() {
    const title = get_title.current.value;

    if (title) {
      try {
        // const res = await instance.get(`/blogs?title=${title}`);
        const res = await apiClient.get("/blogs", {
          params: {
            title: title,
          },
        });

        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };

        setGetResult(fortmatResponse(result));
      } catch (err) {
        setGetResult(fortmatResponse(err.response?.data || err));
      }
    }
  }

  async function postData() {
    const postData = {
      title: post_title.current.value,
      description: post_description.current.value,
    };

    try {
      const res = await apiClient.post("/blogs", postData, {
        headers: {
          "x-access-token": "token-value",
        },
      });

      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };

      setPostResult(fortmatResponse(result));
    } catch (err) {
      setPostResult(fortmatResponse(err.response?.data || err));
    }
  }

  async function putData() {
    const id = put_id.current.value;

    if (id) {
      const putData = {
        title: put_title.current.value,
        description: put_description.current.value,
        published: put_published.current.checked,
      };

      try {
        const res = await apiClient.put(`/blogs/${id}`, putData, {
          headers: {
            "x-access-token": "token-value",
          },
        });

        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };

        setPutResult(fortmatResponse(result));
      } catch (err) {
        setPutResult(fortmatResponse(err.response?.data || err));
      }
    }
  }

  async function deleteAllData() {
    try {
      const res = await apiClient.delete("/blogs");

      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };

      setDeleteResult(fortmatResponse(result));
    } catch (err) {
      setDeleteResult(fortmatResponse(err.response?.data || err));
    }
  }

  async function deleteDataById() {
    const id = delete_id.current.value;

    if (id) {
      try {
        const res = await apiClient.delete(`/blogs/${id}`);

        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };

        setDeleteResult(fortmatResponse(result));
      } catch (err) {
        setDeleteResult(fortmatResponse(err.response?.data || err));
      }
    }
  }

  const clearGetOutput = () => {
    setGetResult(null);
  };

  const clearPostOutput = () => {
    setPostResult(null);
  };

  const clearPutOutput = () => {
    setPutResult(null);
  };

  const clearDeleteOutput = () => {
    setDeleteResult(null);
  };

  return (
    <div id="app" className="container my-3">
	
	<nav className="navbar navbar-expand navbar-dark bg-info">
		<div className="container">            
			  <a href="https://github.com/kabirul">
			    <img src="https://amicacs.com/assets/images/logo.png" className="imground" alt="" /> 
			  </a> 		 
          <div className="navbar-nav mr-auto mleft">
                     
          </div>
		   </div>	 
        </nav>
	
      <h3>React Axios example</h3>

      <div className="card mt-3">
        <div className="card-header">React Axios GET </div>
        <div className="card-body">
          <div className="input-group input-group-sm">
            <button className="btn btn-sm btn-success" onClick={getAllData}>Get All</button>

            <input type="text" ref={get_id} className="form-control ml-2" placeholder="Id" />
            <div className="input-group-append">
              <button className="btn btn-sm btn-primary" onClick={getDataById}>Get by Id</button>
            </div>

            <input type="text" ref={get_title} className="form-control ml-2" placeholder="Title" />
            <div className="input-group-append">
              <button className="btn btn-sm btn-primary" onClick={getDataByTitle}>Find By Title</button>
            </div>

            <button className="btn btn-sm btn-warning ml-2" onClick={clearGetOutput}>Clear</button>
          </div>   
          
          { getResult && <div className="alert alert-secondary mt-2" role="alert"><pre>{getResult}</pre></div> }
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-header">React Axios POST </div>
        <div className="card-body">
          <div className="form-group">
            <input type="text" className="form-control" ref={post_title} placeholder="Title" />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" ref={post_description} placeholder="Description" />
          </div>
          <button className="btn btn-sm btn-success" onClick={postData}>Post Data</button>
          <button className="btn btn-sm btn-warning ml-2" onClick={clearPostOutput}>Clear</button>

          { postResult && <div className="alert alert-secondary mt-2" role="alert"><pre>{postResult}</pre></div> }
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-header">React Axios PUT </div>
        <div className="card-body">
          <div className="form-group">
            <input type="text" className="form-control" ref={put_id} placeholder="Id" />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" ref={put_title} placeholder="Title" />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" ref={put_description} placeholder="Description" />
          </div>
          <div className="form-check mb-2">
            <input type="checkbox" className="form-check-input" ref={put_published} />
            <label className="form-check-label" htmlFor="put_published">Publish</label>
          </div>
          <button className="btn btn-sm btn-success" onClick={putData}>Update Data</button>
          <button className="btn btn-sm btn-warning ml-2" onClick={clearPutOutput}>Clear</button>

          { putResult && <div className="alert alert-secondary mt-2" role="alert"><pre>{putResult}</pre></div> }
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-header">React Axios DELETE </div>
        <div className="card-body">
          <div className="input-group input-group-sm">
            <button className="btn btn-sm btn-danger" onClick={deleteAllData}>Delete All</button>

            <input type="text" ref={delete_id} className="form-control ml-2" placeholder="Id" />
            <div className="input-group-append">
              <button className="btn btn-sm btn-danger" onClick={deleteDataById}>Delete by Id</button>
            </div>

            <button className="btn btn-sm btn-warning ml-2" onClick={clearDeleteOutput}>Clear</button>
          </div>    
          
          { deleteResult && <div className="alert alert-secondary mt-2" role="alert"><pre>{deleteResult}</pre></div> }      
        </div>
      </div>
       <div className="container mt-3">
		   <p className="text-center">React Axios example tutorial <a href="https://github.com/kabirul" target="_blank" rel="noopener noreferrer">amica.</a></p>
		</div>
    </div>
  );
}

export default App;
