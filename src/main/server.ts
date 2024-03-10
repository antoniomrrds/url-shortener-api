import './config/module-alias'
import 'reflect-metadata'

import { app } from '@/main/config'
import { portServer } from '@/main/config/env'
import { PgDataSource } from '@/infrastructure/typeorm/config'

PgDataSource.initialize()
  .then(_ =>
    app.listen(portServer, () => console.log(`🚀Server running at http://localhost:${portServer}`))
  )
  .catch(console.error)
