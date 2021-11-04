import * as http from "http"
import axios from "axios"

if (!global.fetch) { global.fetch = axios }

export default http