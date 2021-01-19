import React, { useState } from "react";
import axios from "axios";

import backend from "../../ip";

export const useGetGroupMembers = (group_id, user_id) => {
  const [members, set_members] = useState();
  const [number_of_members, set_number_of_members] = useState();
  const [is_creator, set_is_creator] = useState();
  const [loading, set_loading] = useState(true);

  const getGroupMembers = async () => {
    set_loading(true);
    try {
      const response = await axios.get(backend + "group/get-all-group-members", {
        params: {
          groupId: group_id,
          userId: user_id
        }
      });
      const { succes, data } = response.data;
      if (succes) {
        set_members(data.members);
        set_number_of_members(data.numberOfMembers);
        set_is_creator(data.isCreator);
        set_loading(false);
      } else {
        console.log("getGroupMembers Error");
      } 
    } catch (error) {
      console.log("There are something wrong about get group members :(");
    }
  };

  return { getGroupMembers, loading, members, number_of_members, is_creator };
};

export const useDeleteGroup = (group_id, user_id) => {
  const deleteGroup = async () => {
    try {
      const response = await axios.delete(backend+"group/delete-group", {
        data: {
          groupId: group_id,
          userId : user_id,
        }
      })
      const { success, data } = response.data;
      if (success) {
        console.log(data);
      } else {
        console.log("delete group Error");
      } 
    } catch (e) {
      console.log(e)
      console.log("There are something wrong about delete group :(");
    }
  };
  
  return { deleteGroup };
};

export const useLeaveGroup = (group_id, user_id) => {
  const [leave_failed, set_leave_failed] = useState(false);

  const leaveGroup = async () => {
    try {
      const response = await axios.put(backend+"group/leave-group", {
        groupId: group_id,
        userId : user_id,
      })
      const { success, data } = response.data;
      if (success) {
        console.log(data);
      } else {
        console.log("leave group Error");
      } 
    } catch (error) {
      if (error.response.status === 400) {
        set_leave_failed(true);
      } else {
        console.log("There are something wrong about leave group :(");
      }
    }
  };
  
  return { leaveGroup, leave_failed };
};