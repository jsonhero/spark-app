import { makeAutoObservable } from "mobx"
import { v4 as uuidv4 } from 'uuid';
import { makePersistable } from 'mobx-persist-store';
import { DateTime } from 'luxon'


class Sparks {
  sparks = []

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

    makePersistable(this, { name: 'Sparks', properties: ['sparks'], storage: window.localStorage});
  }

  add(doc, tags) {
    this.sparks.push({
      id: uuidv4(),
      doc,
      tags,
      timestamp: DateTime.now().toISO()
    })
  }

  update(id, doc, tags = []) {
    this.sparks = this.sparks.map((spark) => {
      if (spark.id === id) {
        return { ...spark, doc, tags }
      }
      return spark
    })
  }

  remove(id) {
    this.sparks = this.sparks.filter((spark) => spark.id !== id)
  }
}


export const sparksStore = new Sparks()
