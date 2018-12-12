// 3p
import React, { Component } from 'react';
import io from 'socket.io-client';

// Project
import { ThemeProvider } from '../../theme/styled-components';
import Chat from '../../components/Chat/Chat';
import UserContext from '../../contexts/UserContext/UserContext';
import GlobalStyles from '../../theme/GlobalStyles';
import { ThemeShape, Themes, ThemeMap, darkTheme, lightTheme, loadThemeSelection, saveThemeSelection } from '../../theme/Themes';
import ThemePicker from '../../components/ThemePicker/ThemePicker';
import { User, Message } from '../../types';
import Api from '../../api/api';


/* --- App Component --- */
interface AppState {
	theme: ThemeShape;
	user: User | null;
}

class App extends Component<{}, AppState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			theme: loadThemeSelection() as ThemeShape,
			user: null,
	  }
	  // Init api
		Api.init();
	}
	
	componentDidMount() {
		Api.getUser()
			.then(user => {
				this.setState({
					user
				})
			})
			.catch(() => {
				// No user?
			})
	}

	setTheme = (theme: Themes) => {
		this.setState({
			theme: ThemeMap[theme]
		});
		saveThemeSelection(theme);
	}

  render() {
    return (
    	<ThemeProvider theme={this.state.theme}>
	    	<>
					<UserContext.Provider value={this.state.user}>
		      	<Chat />
		      	<ThemePicker onSelect={this.setTheme} />
		      </UserContext.Provider>
		      <GlobalStyles />
	      </>
      </ThemeProvider>
    );
  }
}

export default App;
