import axios from "axios";

import backend from "../../ip";

export const useChangeProfileImage = () => {

  const changeProfileImage = async (formData) => {
    try {
      const response = await axios.put(
        backend + "user/change-profile-picture",
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      const { success, data } = response.data;
      if (success) {
        window.location.reload();
      } else {
        console.log("Change Profile Image Error");
      }
    } catch (error) {
      console.log("There are something wrong about change profile image  :(");
    }
  };

  return { changeProfileImage };
};

