import { createStore } from 'vuex'

const store = createStore({
	state() {
		return {
			currentUser: 'ZEM',
            currentUserAvatar:'https://i.imgur.com/YQz6dN5.jpg'
		}
	},
	mutations: {
		changeCurrentUser(state, val) {
			state.currentUser = val
		},
        changeCurrentUserAvatar(state, val) {
			state.currentUserAvatar = val
		},
	},
	actions: {
		changeCurrentUser(context, val) {
			context.commit('changeCurrentUser', val)
		},
        changeCurrentUserAvatar(context, val) {
			context.commit('changeCurrentUserAvatar', val)
		},
	},
})

export default store
