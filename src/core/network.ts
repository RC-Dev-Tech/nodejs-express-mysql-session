import * as express from "express";
import * as cookieParse from "cookie-parser";
import * as session from "express-session";
import * as mysql_session from "express-mysql-session";
import * as cors from "cors";
import * as mysql from "mysql";
import { Config } from "../config";

export class NetWork {
    private static instance : NetWork;

    static getInstance () : NetWork {
        if (!NetWork.instance){
            NetWork.instance = new NetWork ();
        }
        return NetWork.instance;
    }

    public run() {
        const httpconf = Config.getInstance().get()["portal"];
        const port : number = httpconf ["port"];
        
        var app = express();
        var mysqlStore = mysql_session(session);
        
        // 設置連接MySQL的config.
        var mysqlConfig = {
            host: 'localhost',
            user: 'root',
            password: '123456',
            database: 'demo',
            port: 3306
        };

        // 設置sessionStore連線的資訊.
        var sessionConnection = mysql.createConnection(mysqlConfig);
        var sessionStore = new mysqlStore({
            expiration: 10800000,
            createDatabaseTable: true,    //是否要創立新的表單.
            schema: {
               tableName: 'session',      //表單名稱.
               columnNames: {             //表單內容.
                     session_id: 'session_id',
                     expires: 'expires',
                     data: 'data'
               }
            }
        }, sessionConnection);

        // 設置用戶指定好的簽名(秘鑰)(string).
        // 注意，由於Session通常會跟Cookie一起使用，而這個字串則必須兩邊都要相同.
        app.use(cookieParse('secret-key'));

        //配置Session中間件.
        app.use(session({
            secret: 'secret-key',
            store: sessionStore,            // 設置session要存放的位置.
            resave: false,                  // 即使 Session 沒做變動，是否強制重新儲存進 Store.
            saveUninitialized: true,        // 是否強制將未初始化的 Session 儲存至 Store.
            cookie:{
                maxAge: 1000 * 60 * 5,      // 該cookie只保留五分鐘.
            }
        }));

        // 設置cors處理跨域中間件.
        app.use(cors());
        
        // 登入頁面.
        // url: http://localhost:3001/login?id=ricky&pwd=1234
        app.get('/login', (req:any , res:any) => {
            console.log(`/login, cookies => `);console.log(req.signedCookies);
            console.log(`/login, req.session => `);console.log(req.session);

            var id:string = req.query.id.toString();
            var pwd:string = req.query.pwd.toString();
            var user_id: string = id + pwd;
            var user_info = {
                id: user_id,
                name: id,
                pwd: pwd
            }

            if(req.session.USER_INFO){
                res.send('該用戶已登入!');
            } else {
                if (id === "ricky" && pwd === "1234") {
                    req.session.USER_INFO = user_info;
                    res.redirect('/');
                } else {
                    res.send('登入失敗，請輸入正確的帳密!');
                }
            }
        });
        
        // 登出頁面.
        // url: http://localhost:3001/logout
        app.get('/logout', (req: any, res: any)=>{
            console.log(`/logout, cookies => `);console.log(req.signedCookies);
            console.log(`/logout, req.session => `);console.log(req.session);

            req.session.destroy((err: any)=>{
                if(err){
                    res.send('登出失敗');
                } else{
                    res.send('登出成功');
                }
            });
        });
        
        // 首頁.
        // url: http://localhost:3001
        app.get('/', (req: any, res: any) => {
            console.log(`/, cookies => `);console.log(req.signedCookies);
            console.log(`/, req.session => `);console.log(req.session);

            if(req.session.USER_INFO){
                res.send(`歡迎回來${req.session.USER_INFO.name}`);
            } else{
                res.send('請先登入!');
            }
        });

        // 404錯誤頁面.
        app.use((req: any, res:any) => {
            res.send('404 not found');
        });

        app.listen(port);
    }
}