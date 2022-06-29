const window_config_default = {
    url: '',
    height: 600,
    width: 800,
    status: 'no',
    toolbar: 'no',
    menubar: 'no',
    location: 'no',
    resizable: 'no',
    scrollbars: '0',
    titlebar: 'no'
}

export default {
    name: 'dialog-util',

    openWindow: function (window_config_customize) {
        var config = Object.assign(window_config_default, window_config_customize)
        
        if (typeof(config.url)=="undefined" || config.url=='' || config.url == null) {
            throw new Error('[url] is not define !')
        }
        
        var iTop = (window.screen.availHeight - 30 - config.height) / 2
        var iLeft = (window.screen.availWidth - 10 - config.width) / 2
        window.open(
            config.url, 
            '_blank', 
            'height=' + config.height 
            + ',innerHeight=' + config.height 
            + ',width=' + config.width 
            + ',innerWidth=' + config.width 
            + ',top=' + iTop 
            + ',left=' + iLeft 
            + ',status=' + config.status
            + ',toolbar=' + config.toolbar
            + ',menubar=' + config.menubar
            + ',location=' + config.location
            + ',resizable=' + config.resizable
            + ',scrollbars=' + config.scrollbars
            + ',titlebar=' + config.titlebar
        )
    },

    closeWindow: function () {
        window.close()
    }
}