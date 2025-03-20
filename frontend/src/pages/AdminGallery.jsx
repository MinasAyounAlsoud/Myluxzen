import { useEffect, useState } from "react";

function AdminGalleryPage() {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch("/api/images")
      .then((res) => res.json())
      .then((data) => setImages(data));
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Sélectionne une image !");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("description", description);

    const res = await fetch("/api/images/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const newImage = await res.json();
      setImages([...images, newImage]);
      setFile(null);
      setDescription("");
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/images/${id}`, { method: "DELETE" });

    if (res.ok) {
      setImages(images.filter((img) => img._id !== id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Galerie</h1>

      <form onSubmit={handleUpload} className="mb-4">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 ml-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 ml-2">
          Ajouter
        </button>
      </form>

      <div className="grid grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image._id} className="border p-2">
            <img src={image.url} alt={image.description} className="w-full h-32 object-cover" />
            <p>{image.description}</p>
            <button onClick={() => handleDelete(image._id)} className="bg-red-500 text-white p-2 mt-2">
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminGalleryPage;
