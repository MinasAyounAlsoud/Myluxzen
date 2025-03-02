import React, { useEffect, useState } from 'react';

function ContactForm({ user, newBooking, setNewBooking }) {




   
  const [focusedField, setFocusedField] = useState(null);
    // useEffect(() => {
    //     if (user) {
    //       // 如果 user 存在，使用 user 的信息来初始化 newBooking
    //       setNewBooking({
    //         email: user.email,
    //         guestFirstName: user.firstName,
    //         guestFamilyName: user.lastName,
    //         mobileNumber: user.phoneNumber,
    //         comments: newBooking.comments || ''  // 保留已有的 comments 或初始化为空
    //       });
    //     }
    //   }, [user]);
//   useEffect(() => {
//     setFormData(prevFormData => ({
//       email: newBooking.email || prevFormData.email,
//       firstName: newBooking.guestFirstName || prevFormData.firstName,
//       lastName: newBooking.guestFamilyName || prevFormData.lastName,
//       phoneNumber: newBooking.mobileNumber || prevFormData.phoneNumber,
//       comments: newBooking.comments || prevFormData.comments
//     }));
//   }, [newBooking])

//   if(newBooking.email === ""){
//     setNewBooking(prevBooking => ({
//         ...prevBooking,
//         email: formData.email,
//         // firstName:
//       }));
//   }

  // 处理表单字段更改
  const handleChange = (e) => {
    const { name, value } = e.target;
    // setFormData(prev => ({
    //   ...prev,
    //   [name]: value
    // }));

    // 同步 formData 更改回 newBooking
    setNewBooking(prevBooking => ({
      ...prevBooking,
      [name]: value
    }));
  };

  const handleFocus = (name) => {
    setFocusedField(name);
  };

  const handleBlur = (name) => {
    setFocusedField(null);
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form Data Submitted:', formData);
//     // Here you would typically handle the submission, e.g., send data to a server
//   };

  return (
    <div className="w-full">
    <form className="space-y-10">
      <div>
          <div className={`relative border rounded-lg  ${focusedField === 'email' || newBooking.email ? 'border-gray-700' : 'border-gray-300'} p-2`}>
            <label htmlFor="email" className={`absolute text-gray-700 transition-all ${focusedField === 'email' || newBooking.email ? 'text-sm top-0' : 'text-lg top-1/2 transform -translate-y-1/2'}`}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={newBooking.email}
              onChange={handleChange}
              onFocus={() => handleFocus('email')}
              onBlur={() => handleBlur('email')}
            //   disabled={!!user}
              className="mt-1 block w-full px-3 py-2 bg-transparent focus:outline-none"
            />
          </div>
            <p>email error</p>
      </div>
      <div className="flex space-x-4">
        <div className="flex-1">
            <div className={`relative border rounded-lg  ${focusedField === 'guestFirstName' || newBooking.newBooking ? 'border-gray-700' : 'border-gray-300'} p-2 `}>
              <label htmlFor="guestFirstName" className={`absolute text-gray-700 transition-all ${focusedField === 'guestFirstName' || newBooking.guestFirstName ? 'text-sm top-0' : 'text-lg top-1/2 transform -translate-y-1/2'}`}>
                First Name:
              </label>
              <input
                type="text"
                id="guestFirstName"
                name="guestFirstName"
                value={newBooking.guestFirstName}
                onChange={handleChange}
                onFocus={() => handleFocus('guestFirstName')}
                onBlur={() => handleBlur('guestFirstName')}
                className="mt-1 block w-full px-3 py-2 bg-transparent focus:outline-none"
              />
            </div>
            <p>guestFirstName error</p>
        </div>
        <div className="flex-1">
        <div className={`relative border rounded-lg  ${focusedField === 'guestFamilyName' || newBooking.guestFamilyName ? 'border-gray-700' : 'border-gray-300'} p-2`}>
          <label htmlFor="guestFamilyName" className={`absolute text-gray-700 transition-all ${focusedField === 'guestFamilyName' || newBooking.guestFamilyName ? 'text-sm top-0' : 'text-lg top-1/2 transform -translate-y-1/2'}`}>
            Last Name:
          </label>
          <input
            type="text"
            id="guestFamilyName"
            name="guestFamilyName"
            value={newBooking.guestFamilyName}
            onChange={handleChange}
            onFocus={() => handleFocus('guestFamilyName')}
            onBlur={() => handleBlur('guestFamilyName')}
            className="mt-1 block w-full px-3 py-2 bg-transparent focus:outline-none"
          />
        </div>
        <p>guestFamilyName error</p>
        </div>

      </div>

      <div className={`relative border rounded-lg  ${focusedField === 'mobileNumber' || newBooking.mobileNumber ? 'border-gray-700' : 'border-gray-300'} p-2`}>
        <label htmlFor="mobileNumber" className={`absolute text-gray-700 transition-all ${focusedField === 'mobileNumber' || newBooking.mobileNumber ? 'text-sm top-0' : 'text-lg top-1/2 transform -translate-y-1/2'}`}>
          Phone Number:
        </label>
        <input
          type="text"
          id="mobileNumber"
          name="mobileNumber"
          value={newBooking.mobileNumber}
          onChange={handleChange}
          onFocus={() => handleFocus('mobileNumber')}
          onBlur={() => handleBlur('mobileNumber')}
          className="mt-1 block w-full px-3 py-2 bg-transparent focus:outline-none"
        />
      </div>
      <div className={`relative border rounded-lg  ${focusedField === 'comments' || newBooking.comments ? 'border-gray-700' : 'border-gray-300'} p-2`}>
        <label htmlFor="comments" className={`absolute text-gray-700 transition-all ${focusedField === 'comments' || newBooking.comments ? 'text-sm top-0' : 'text-lg top-1/2 transform -translate-y-1/2'}`}>
          Comments (Optional):
        </label>
        <textarea
          id="comments"
          name="comments"
          value={newBooking.comments}
          onChange={handleChange}
          onFocus={() => handleFocus('comments')}
          onBlur={() => handleBlur('comments')}
          className="mt-1 block w-full px-3 py-2 bg-transparent focus:outline-none"
          rows="3"
        />
      </div>

      {/* <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Submit
      </button> */}
    </form>
    </div>
  );
}

export default ContactForm;
