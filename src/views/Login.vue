<template>
    <div id="ims-login-container">

        <div id="login-fm">
            <div class="header">
                <h1>IMS</h1>
                <p>一切从登录开始</p>
            </div>
            <div class="body">
                <Form ref="loginForm" :model="loginForm" class="login-form" :rules="ruleValidate">
                    <FormItem prop="account">
                        <Input element-id="account" v-model="loginForm.account" prefix="ios-contact"
                               placeholder="账号/邮箱/手机号"/>
                    </FormItem>
                    <FormItem prop="password">
                        <Input element-id="password"
                               @on-click="showPwd"
                               v-model="loginForm.password"
                               :type="passwordInputType"
                               prefix="ios-unlock"
                               :icon="passwordInputSuffixIcon"
                               placeholder="密码"
                        />
                    </FormItem>
                    <FormItem>
                        <Tooltip content="请勿在公共场所使用" placement="right">
                            <Checkbox v-model="loginForm.rememb">记住密码</Checkbox>
                        </Tooltip>
                        <Tooltip class="forgetpwd" placement="right" content="忘记密码请联系管理员">
                            <span> 忘记密码？ </span>
                        </Tooltip>
                    </FormItem>
                    <FormItem>
                        <Button type="success" :loading="logining" long @click="login('loginForm')">登录</Button>
                    </FormItem>
                </Form>
            </div>
        </div>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "Login",
        data() {
            return {
                loading: false,
                passwordInputType: 'password',
                passwordInputSuffixIcon: 'md-eye',
                loginForm: {
                    account: 'cw001@163.com',
                    password: '123456',
                    rememb: false
                },
                ruleValidate: {
                    account: [
                        {required: true, message: '请输入登录账号', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入登录密码', trigger: 'blur'}
                    ]
                }
            }
        },

        computed: {
            ...mapGetters({
                'logining': 'admin/logining',
                'is_logined': 'admin/is_logined',
                'routers': 'admin/routers',
            })
        },

        methods: {
            showPwd() {
                if (this.passwordInputType == 'password') {
                    this.passwordInputType = 'text';
                    this.passwordInputSuffixIcon = 'md-eye-off';
                } else {
                    this.passwordInputType = 'password';
                    this.passwordInputSuffixIcon = 'md-eye';
                }
            },
            login(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        console.info('logining....');
                        this.$store.dispatch('admin/login', this.loginForm).then(() => {
                            if (this.is_logined) {
                                console.info('logined.......', this.routers);
                                this.$router.addRoutes(this.routers.concat([{
                                    path: '*',
                                    redirect: '/404'
                                }]));
                                this.$router.push('/');
                            } else {
                                this.$Message.error('账号或密码错误!');
                            }
                        }).catch(error => {
                            console.info('catch -- error');
                            console.info(error);
                        });
                    } else {
                        // this.$Message.error('请正确输入账号密码');
                    }
                })

            }
        }
    }
</script>

<style lang="less" scoped>
    #ims-login-container {
        display: flex;

        justify-content: center;
        align-items: center;
        height: 100vh;

        #login-fm {
            width: 300px;
            /*height: 200px;*/
            .header {
                text-align: center;
                margin-bottom: 20px;
                h1 {
                    margin-bottom: 10px;
                    font-weight: 300;
                    font-size: 30px;
                    color: #17233d;
                }
                p {
                    color: #808695;
                    font-weight: 300;
                }
            }
            .body {
                .forgetpwd {
                    float: right;
                    margin-right: 0;
                    cursor: pointer;
                }
            }
        }

    }
</style>
