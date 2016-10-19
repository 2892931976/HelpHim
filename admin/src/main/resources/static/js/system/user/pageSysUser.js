$(function () {
    buildJqGridGenerator();
    initValidate();
});

function initValidate() {
    $("#edit-form").validate({
        errorPlacement: (error, element) => {
            element.after(error);
        },
        rules: {
            nickname : {
                required : true,
                maxlength : 100
            },
            username : {
                required : true,
                maxlength : 100
            },
            password : {
                accordingTo : true,
                maxlength : 30,
                minlength : 6

            },
            email : {
                required : true,
                maxlength : 100
            },
            mobilePhone : {
                required : true,
                number : true,
                maxlength : 11,
                minlength : 11
            }
        },
        messages : {
            nickname : {
                required : "必填",
                maxlength : "最长100个字符"
            },
            username : {
                required : "必填",
                maxlength : "最长100个字符"
            },
            password : {
                maxlength : "最长30个字符",
                minlength : "最短6个字符",
                accordingTo : "必填"
            },
            email : {
                required : "必填",
                maxlength : "最长100个字符"
            },
            mobilePhone : {
                required : "必填",
                number : "只能填数字",
                maxlength : "最长11个字符",
                minlength : "最短11个字符"
            }
        },
        submitHandler : form => {
            $(form).ajaxSubmit({
                success : result => {
                    if(200 == result.code) {
                        $(iJqGrid).trigger("reloadGrid");
                        $("#edit-modal-form").modal("hide");
                    } else {
                        alert(result.message);
                    }
                }
            });
        }
    });
}


function buildJqGridGenerator() {
    var tableSelector = "#data-table-1",
        pager = "pager-table-1";
    return jqGridFactory.generate({
        tableSelector : tableSelector,
        pager : pager,
        url : "/system/user/list.json",
        caption:"系统用户列表",
        colNames : ["昵称", "用户名", "邮箱", "手机", "创建时间" ],
        colModel : [
            {
                name : "nickname",
                index : "nickname"
            },
            {
                name : "username",
                index : "username"
            },
            {
                name : "email",
                index : "email",
            },
            {
                name : "mobilePhone",
                index : "mobilePhone"
            },
            {
                name : "createTime",
                index : "createTime",
                formatter : (cellValue, options, row) => {
                    return new Date(cellValue).format("yyyy-MM-dd hh:mm:ss");
                },
                searchoptions : {
                    dataInit : ele => {
                        DateTimePickerFactory.generate(ele);
                    }
                }
            }
        ]
    }).navButtonAdd('#pager-table-1',{
        caption : "",
        title : "关联角色",
        buttonicon : "ui-icon-shuffle",
        onClickButton : releationRoles
    });
}

function releationRoles() {
    var dataId = iJqGrid.jqGrid('getGridParam','selrow');
    if(!dataId) {
        alert("请选择需要关联角色的用户！");
        return ;
    }
    $.ajax({
        type : "GET",
        url  : "/system/role/listAndChecked.json",
        data : {
            userId : dataId
        },
        success : result => {
            if(isRequestSuccess(result)) {
                var data = result.result;
                var roleTmpl = `
                        <% for(var i = 0, j = result.length; i < j ; i++) { %>
                        <tr>
                            <td><%=i+1%></td>
                            <td><%=result[i].name%></td>
                            <td><%=result[i].description%></td>
                            <td>
                                <label class="i-checks" id="is-show-checks">
                                    <input <%= result[i].checked ? "checked" : "" %> class="role-icheck" type="checkbox" value="<%=result[i].id%>"/>
                                </label>
                            </td>
                        </tr>
                        <% } %>
                    `;
                var html = template.compile(roleTmpl)(result);
                $("#roles").html(html);
                bindIChecks(".role-icheck");
            } else {
                handleRequestFail(result);
            }
        }
    });
    $("#releation-role-form").modal();

}

/**
 * 获得权限类型的含义
 * @param value
 * @returns {*}
 */
function meaningOfPermissionType(value) {
    switch (parseInt(value)) {
        case 1 :
            return "模块";
        case 2 :
            return "菜单";
        case 3 :
            return "功能";
    }
}

/**
 * 添加模板，模态框
 */
function addFuncDiaglog(id) {
    $("#id").val();
    $("#edit-form #username").prop("disabled", false);
}

/**
 * 编辑模板，模态框
 *
 * @param id 数据ID
 */
function editFuncDiaglog(entity) {
    $("#edit-form #password").val("");
    $("#edit-form #username").prop("disabled", true);
}

/**
 * 删除模板，模态框
 *
 * @param id 数据ID
 */
function delFuncDiaglog(id) {
}
