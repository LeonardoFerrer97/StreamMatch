import Menu, {MenuItem} from "react-native-material-menu";
import { Image, TouchableOpacity} from "react-native";

export default MenuHeader = ()  => {

    _menu = null;

    setMenuRef = ref => {
        this._menu = ref;
    };

    hideMenu = () => {
        this._menu.hide();
    };

    showMenu = () => {
        this._menu.show();
    };
        return (
            <Menu
                ref={(ref) => this._menu = ref}
                button={<TouchableOpacity onPress={() => this._menu.show()} style={{paddingHorizontal:16, height: '100%', alignItems:'center', justifyContent: 'center'}}><Image source={require('../assets/Icons/option_ic.png')} style={{width: 20, height: 20, alignSelf:'center'}} resizeMode='contain'/></TouchableOpacity>}
            >
                <MenuItem textStyle={{color: '#000', fontSize: 16}}>Rate App</MenuItem>
                <MenuItem textStyle={{color: '#000', fontSize: 16}}>Invite Friends</MenuItem>
            </Menu>
        )
}