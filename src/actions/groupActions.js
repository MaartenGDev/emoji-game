import { LOAD_GROUPS, ADD_GROUP, UPDATE_GROUP, DESTROY_GROUP } from './groupTypes'
import GroupApi from '../services/GroupApi'

const groupApi = new GroupApi();

export const createGroupSuccess = group => ({
  type: ADD_GROUP,
  group
})

export const updateGroupSuccess = group => ({
  type: UPDATE_GROUP,
  group
})

export const destroyGroupSuccess = group => ({
  type: DESTROY_GROUP,
  group
})
export const loadGroupsSuccess = groups => ({
  type: LOAD_GROUPS,
  groups
})

export const loadGroups = () => {
  return async dispatch => {
    return groupApi.all()
      .then(groups => dispatch(loadGroupsSuccess(groups)))
  }
}

export const updateGroup = group => {
  return async dispatch => {
    return groupApi.createOrUpdate(group)
      .then(savedGroup => {
        const providedGroupWithPossibleNewId = {...group, id: savedGroup.id};
        group.id === undefined
          ? dispatch(createGroupSuccess(providedGroupWithPossibleNewId))
          : dispatch(updateGroupSuccess(providedGroupWithPossibleNewId))
      })
  }
}

export const destroyGroup = group => {
  return async dispatch => {
    return groupApi.destroy(group)
      .then(res => dispatch(destroyGroupSuccess(group)))
  }
}