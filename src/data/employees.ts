export const departments = [
  'flugusvid',
  'esjusvid',
  'fjarmal',
  'sala',
  'taekni',
] as const

export type Department = (typeof departments)[number]

export type Employee = {
  id: string
  name: string
  title: string
  department: Department
  email: string
  phone: string
  startedAt: string
}

export const employees: Employee[] = [
  {
    id: '1',
    name: 'Jón Gunnarsson',
    title: 'Verkstjóri',
    department: 'flugusvid',
    email: 'jon.gunnarsson@malbikstodin.is',
    phone: '+354 555 0101',
    startedAt: '2018-03-12',
  },
  {
    id: '2',
    name: 'Guðrún Pálsdóttir',
    title: 'Verkefnastjóri',
    department: 'flugusvid',
    email: 'gudrun.palsdottir@malbikstodin.is',
    phone: '+354 555 0102',
    startedAt: '2020-06-01',
  },
  {
    id: '3',
    name: 'Einar Þórsson',
    title: 'Vélamaður',
    department: 'esjusvid',
    email: 'einar.thorsson@malbikstodin.is',
    phone: '+354 555 0103',
    startedAt: '2016-09-20',
  },
  {
    id: '4',
    name: 'Sigríður Jónsdóttir',
    title: 'Gæðastjóri',
    department: 'esjusvid',
    email: 'sigridur.jonsdottir@malbikstodin.is',
    phone: '+354 555 0104',
    startedAt: '2019-01-15',
  },
  {
    id: '5',
    name: 'Björn Halldórsson',
    title: 'Fjármálastjóri',
    department: 'fjarmal',
    email: 'bjorn.halldorsson@malbikstodin.is',
    phone: '+354 555 0105',
    startedAt: '2015-04-08',
  },
  {
    id: '6',
    name: 'Ásta Ragnarsdóttir',
    title: 'Bókari',
    department: 'fjarmal',
    email: 'asta.ragnarsdottir@malbikstodin.is',
    phone: '+354 555 0106',
    startedAt: '2021-11-02',
  },
  {
    id: '7',
    name: 'Kristján Ólafsson',
    title: 'Sölustjóri',
    department: 'sala',
    email: 'kristjan.olafsson@malbikstodin.is',
    phone: '+354 555 0107',
    startedAt: '2017-08-14',
  },
  {
    id: '8',
    name: 'Helga Magnúsdóttir',
    title: 'Sölufulltrúi',
    department: 'sala',
    email: 'helga.magnusdottir@malbikstodin.is',
    phone: '+354 555 0108',
    startedAt: '2022-02-28',
  },
  {
    id: '9',
    name: 'Ólafur Sigurðsson',
    title: 'Kerfisstjóri',
    department: 'taekni',
    email: 'olafur.sigurdsson@malbikstodin.is',
    phone: '+354 555 0109',
    startedAt: '2014-05-19',
  },
  {
    id: '10',
    name: 'Katrín Björnsdóttir',
    title: 'Hugbúnaðarverkfræðingur',
    department: 'taekni',
    email: 'katrin.bjornsdottir@malbikstodin.is',
    phone: '+354 555 0110',
    startedAt: '2023-01-09',
  },
  {
    id: '11',
    name: 'Arnar Freyr Jóhannsson',
    title: 'Vinnuvélamaður',
    department: 'flugusvid',
    email: 'arnar.johannsson@malbikstodin.is',
    phone: '+354 555 0111',
    startedAt: '2019-10-07',
  },
  {
    id: '12',
    name: 'Margrét Elíasdóttir',
    title: 'Mannauðsstjóri',
    department: 'fjarmal',
    email: 'margret.eliasdottir@malbikstodin.is',
    phone: '+354 555 0112',
    startedAt: '2018-12-03',
  },
]
