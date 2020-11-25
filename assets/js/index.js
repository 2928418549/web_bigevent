$(function () {
    getUserInfo()
    //点击退出实现跳转到登录页面
    var layer = layui.layer
    $('#btnLogout').on('click', function (e) {

        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        });
    })
})
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status === 0) {
                return renderAvatar(res.data)
            }
        },
        // complete: function (res) {
        //     if (res.responseJSON.status === 1 || res.responseJSON.message === '身份认证失败！'){
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })
}
function renderAvatar(user) {
    console.log(user);
    var name = user.username || nickname
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name + '&nbsp;&nbsp;大佬回来')
    if (user.user_pic !== null) {
        $('.layui-nav-img')
            .attr('src', user.user_pic)
            .show()
        $('.text-avatar')
            .hide()
    } else {
        $('.layui-nav-img').hide()
        var fiser = name[0].toUpperCase()
        $('.text-avatar').html(fiser).show()
    }

}