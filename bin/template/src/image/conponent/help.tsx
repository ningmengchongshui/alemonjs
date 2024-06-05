import React from 'react'

export type DataType = {
  id: number
  group: string
  list: {
    id: number
    name: string
    doc: string
  }[]
}[]

type Props = {
  data: DataType
}

export default function App({ data }: Props) {
  return (
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="../css/output.css" />
        <link rel="stylesheet" type="text/css" href="../css/help.css" />
      </head>
      <body>
        <div className="body-top"></div>
        {data.map(val => (
          <div key={val.id}>
            <div className="body-point">
              <div className="body-point-font">{val.group}</div>
            </div>
            <div>
              {val.list.map(item => (
                <div key={item.id} className="body-box">
                  <div className="body-box-font-title">{item.name}</div>
                  <div className="body-box-font-desc">{item.doc}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="body-buttom"></div>
      </body>
    </html>
  )
}
