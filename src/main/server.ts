import './config/module-alias'
import 'reflect-metadata'

import { app } from '@/main/config'
import { portServer } from '@/main/config/env'

app.listen(portServer, () => console.log(`🚀Server running at http://localhost:${portServer}`))
