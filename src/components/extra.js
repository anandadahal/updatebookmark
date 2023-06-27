
// // import React, { useState } from 'react';

// // const EditableForm = () => {
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [inputValue, setInputValue] = useState('');

// //   const handleEditClick = () => {
// //     setIsEditing(true);
// //   };

// //   const handleSaveClick = () => {
// //     setIsEditing(false);
// //     // Perform save logic here, e.g., update the data in the backend
// //     console.log('Saved:', inputValue);
// //   };

// //   const handleInputChange = (e) => {
// //     setInputValue(e.target.value);
// //   };

// //   return (
// //     <div>
// //       {!isEditing ? (
// //         <button onClick={handleEditClick}>Edit</button>
// //       ) : (
// //         <div>
// //           <input
// //             type="text"
// //             value={inputValue}
// //             onChange={handleInputChange}
// //             className="border p-2 w-2/3 rounded-md"
// //           />
// //           <button onClick={handleSaveClick}>Save</button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default EditableForm;


// import React, { useState } from 'react';
// import { Appwrite } from 'appwrite';

// const client = new Appwrite();

// client
//   .setEndpoint('https://YOUR_ENDPOINT')
//   .setProject('YOUR_PROJECT_ID')
//   .setKey('YOUR_API_KEY');

// const EditableForm = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [inputValue, setInputValue] = useState('');

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleSaveClick = async () => {
//     setIsEditing(false);
//     try {
//       await client.database.updateDocument('YOUR_COLLECTION_ID', 'YOUR_DOCUMENT_ID', {
//         name: inputValue
//       });
//       console.log('Document updated successfully');
//     } catch (error) {
//       console.error('Error updating document:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     setInputValue(e.target.value);
//   };

//   return (
//     <div>
//       {!isEditing ? (
//         <button onClick={handleEditClick}>Edit</button>
//       ) : (
//         <div>
//           <input
//             type="text"
//             value={inputValue}
//             onChange={handleInputChange}
//           />
//           <button onClick={handleSaveClick}>Save</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EditableForm;

import React, { useState } from 'react';
import { Client, Databases } from 'appwrite';

const client = new Client();
const databases = new Databases(client);

client
  .setEndpoint("http://64.227.153.6:7000/v1") // Replace with your API Endpoint
  .setProject("64801c442b7e7409a704") // Replace with your project ID
;

const EditableForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    try {
      const response = await databases.updateDocument("64801c50653e27753cf8",  "64801c594d7d8845115a",  {
        name: inputValue
      });
      console.log(response); // Success
    } catch (error) {
      console.log(error); // Failure
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  
  return (
    <div>
      {!isEditing ? (
        <button onClick={handleEditClick}>Edit</button>
      ) : (
        <div>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="border p-2 w-2/3 rounded-md"
          />
          <button onClick={handleSaveClick}>Save</button>
        </div>
      )}
    </div>
  );
};

export default EditableForm;

