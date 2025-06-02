/* eslint-disable @typescript-eslint/consistent-type-imports */

import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { connect } from './src/config/mongodb'
connect()
import { systemConfig } from './src/config/system'
import adminRoutes from './src/routes/admin/index.route'

import { corsOptions } from './src/config/cors' 

import morgan from 'morgan'
const app: Express = express()
const port: number = 3000

// Cau hinh de BE lấy được cookie từ client
app.use(cookieParser())

app.use(cors(corsOptions))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(morgan('dev'))
// App Local Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin

adminRoutes(app)

app.listen(port, () => {
  // eslint-disable-next-line no-undef
  console.log(`App listening on port ${port}`)
})
