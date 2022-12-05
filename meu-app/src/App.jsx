import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);
  const apiEndPoint = "https://jsonplaceholder.typicode.com/posts";
  useEffect(() => {
    const getPosts = async () => {
      const { data: res } = await axios.get(apiEndPoint);
      setPosts(res);
    };
    getPosts();
  }, []);

  // Inserindo o post - const
  const handleAdd = async () => {
    const post = { title: "nTitle", body: "nBody" };
    await axios.post(apiEndPoint, post)
    setPosts([post, ...posts])
  }
  // Att : put
  const handleUpdate = async post => {
    post.title = "Atualizando os valores";
    await axios.put(apiEndPoint + '/' + post.id)
    const postClone = [...posts]
    const index = postClone.indexOf(post)
    postClone[index] = { ...post}
    setPosts(postClone)
  }
  // At
  // Deletar : delete
  const handleDelete = async post => {
    await axios.delete(apiEndPoint + '/' + post.id + post)
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className="container">
      <h2>Qtd de itens: {posts.length} Na minha API</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Atualização</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>
                <button onClick={() => handleUpdate(post)} className="btn btn-info btn-sm">Update</button>
              </td>
              <td>
                <button onClick={handleAdd} className="btn btn-info btn-sm">Inserir</button>
              </td>
              <td>
                <button onClick={() => handleDelete(post)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
