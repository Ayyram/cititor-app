import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function getTotalPagesRead(books) {
  return books.reduce((total, book) => total + book.pagesRead, 0);
}

function getTotalBooksCompleted(books) {
  return books.filter(book => book.pagesRead === book.totalPages).length;
}

export default function App() {
  const [books, setBooks] = useState([
    { title: "Micul Prinț", pagesRead: 13, totalPages: 290 },
    { title: "Puterea Prezentului", pagesRead: 40, totalPages: 210 },
  ]);
  const [newBook, setNewBook] = useState("");

  return (
    <div className="min-h-screen bg-blue-100 p-4 text-gray-900">
      <h1 className="text-2xl font-bold mb-6">📚 Bun venit în Jurnalul tău de lectură!</h1>
      <Tabs defaultValue="monitorizare">
        <TabsList className="mb-4">
          <TabsTrigger value="monitorizare">📈 Monitorizare</TabsTrigger>
        </TabsList>
        <TabsContent value="monitorizare">
          <Card className="rounded-2xl shadow-md">
            <CardContent className="p-4 space-y-6">
              <h2 className="text-xl font-semibold">📊 Monitorizarea lecturilor</h2>

              <div className="bg-white p-4 rounded-xl shadow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <p className="text-gray-600 text-sm">Total pagini citite</p>
                  <p className="text-lg font-bold">{getTotalPagesRead(books)}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Cărți finalizate</p>
                  <p className="text-lg font-bold">{getTotalBooksCompleted(books)} / {books.length}</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow">
                <h3 className="text-lg font-semibold mb-2">Grafic progres lectură</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={books.map((book) => ({ name: book.title, pagini: book.pagesRead }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="pagini" stroke="#2563eb" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <ul className="space-y-4">
                {books.map((book, idx) => (
                  <li key={idx} className="bg-white p-3 rounded-xl shadow">
                    <div className="font-medium text-lg">{book.title}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        type="number"
                        min="0"
                        max={book.totalPages}
                        value={book.pagesRead}
                        onChange={(e) => {
                          const updatedBooks = [...books];
                          updatedBooks[idx].pagesRead = Number(e.target.value);
                          setBooks(updatedBooks);
                        }}
                      />
                      <span className="text-sm text-gray-600">din {book.totalPages} pagini</span>
                    </div>
                    <Progress value={(book.pagesRead / book.totalPages) * 100} className="mt-2" />
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
