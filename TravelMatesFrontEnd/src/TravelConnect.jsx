import React, { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar"
import { Button } from "./components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card"
import { Input } from "./components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { Textarea } from "./components/ui/textarea"
import { ScrollArea } from "./components/ui/scroll-area"
import { MapPin, MessageCircle, Search, Share2, Star, Bell } from "lucide-react"
import { useToast } from "./components/ui/use-toast"
import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api'

export default function TravelConnect() {
  const [activeTab, setActiveTab] = useState("nearby")
  const [nearbyTravelers, setNearbyTravelers] = useState([])
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [destinations, setDestinations] = useState([])
  const [experiences, setExperiences] = useState([])
  const [newExperience, setNewExperience] = useState({ destination: "", content: "" })
  const { toast } = useToast()

  useEffect(() => {
    fetchNearbyTravelers()
    fetchMessages()
    fetchDestinations()
    fetchExperiences()
  }, [])

  const fetchNearbyTravelers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/travelers`)
      setNearbyTravelers(response.data)
    } catch (error) {
      console.error("Error fetching nearby travelers:", error)
      toast({
        title: "Error",
        description: "Failed to fetch nearby travelers",
        status: "error",
      })
    }
  }

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/messages`)
      setMessages(response.data)
    } catch (error) {
      console.error("Error fetching messages:", error)
      toast({
        title: "Error",
        description: "Failed to fetch messages",
        status: "error",
      })
    }
  }

  const fetchDestinations = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/destinations`)
      setDestinations(response.data)
    } catch (error) {
      console.error("Error fetching destinations:", error)
      toast({
        title: "Error",
        description: "Failed to fetch destinations",
        status: "error",
      })
    }
  }

  const fetchExperiences = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/experiences`)
      setExperiences(response.data)
    } catch (error) {
      console.error("Error fetching experiences:", error)
      toast({
        title: "Error",
        description: "Failed to fetch experiences",
        status: "error",
      })
    }
  }

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        const response = await axios.post(`${API_BASE_URL}/messages`, {
          senderId: "currentUser", // Replace with actual user ID when authentication is implemented
          content: newMessage
        })
        setMessages([...messages, response.data])
        setNewMessage("")
        toast({
          title: "Success",
          description: "Message sent successfully",
          status: "success",
        })
      } catch (error) {
        console.error("Error sending message:", error)
        toast({
          title: "Error",
          description: "Failed to send message",
          status: "error",
        })
      }
    }
  }

  const handleShareExperience = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/experiences`, newExperience)
      setExperiences([...experiences, response.data])
      setNewExperience({ destination: "", content: "" })
      toast({
        title: "Success",
        description: "Experience shared successfully",
        status: "success",
      })
    } catch (error) {
      console.error("Error sharing experience:", error)
      toast({
        title: "Error",
        description: "Failed to share experience",
        status: "error",
      })
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full h-full max-w-5xl p-6 bg-white shadow-lg overflow-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold text-blue-600">TravelConnect</CardTitle>
              <CardDescription className="text-gray-600">
                Connect, explore, and share your travel experiences
              </CardDescription>
            </div>
            <Button variant="outline" size="icon" className="text-blue-600 border-blue-600 hover:bg-blue-100">
              <Bell className="h-6 w-6" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-4 bg-gray-100 rounded-md">
              <TabsTrigger
                value="nearby"
                className={`py-2 font-medium ${activeTab === 'nearby' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              >
                Nearby
              </TabsTrigger>
              <TabsTrigger
                value="explore"
                className={`py-2 font-medium ${activeTab === 'explore' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              >
                Explore
              </TabsTrigger>
              <TabsTrigger
                value="experiences"
                className={`py-2 font-medium ${activeTab === 'experiences' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              >
                Experiences
              </TabsTrigger>
              <TabsTrigger
                value="messages"
                className={`py-2 font-medium ${activeTab === 'messages' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              >
                Messages
              </TabsTrigger>
            </TabsList>
            <TabsContent value="nearby">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Input placeholder="Search nearby travelers" className="flex-grow" />
                  <Button size="icon" className="bg-blue-600 text-white hover:bg-blue-700">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                {nearbyTravelers.map((traveler) => (
                  <Card key={traveler.id} className="border border-gray-200 rounded-lg">
                    <CardHeader className="flex items-center space-x-4 py-4">
                      <Avatar>
                        <AvatarImage src={traveler.avatar} alt={traveler.name} />
                        <AvatarFallback>{traveler.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg font-semibold text-gray-800">{traveler.name}</CardTitle>
                        <CardDescription className="text-sm text-gray-600">
                          <MapPin className="h-4 w-4 inline-block mr-1 text-blue-500" />
                          {traveler.location}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardFooter>
                      <Button variant="outline" className="w-full text-blue-600 border-blue-600 hover:bg-blue-50">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Connect
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="explore">
              <div className="space-y-4">
                <Input placeholder="Search destinations" className="flex-grow" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {destinations.map((destination) => (
                    <Card key={destination.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-32 object-cover"
                      />
                      <CardHeader className="p-4">
                        <CardTitle className="text-lg font-semibold text-gray-800">{destination.name}</CardTitle>
                        <CardDescription className="text-sm text-gray-600">
                          <Star className="h-4 w-4 inline-block mr-1 text-yellow-500" />
                          {destination.rating} / 5
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="p-4">
                        <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">Learn More</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="experiences">
              <div className="space-y-4">
                <Card className="border border-gray-200 rounded-lg">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg font-semibold text-gray-800">Share Your Experience</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleShareExperience(); }}>
                      <Input
                        placeholder="Destination"
                        className="w-full"
                        value={newExperience.destination}
                        onChange={(e) => setNewExperience({ ...newExperience, destination: e.target.value })}
                      />
                      <Textarea
                        placeholder="Share your travel story..."
                        className="w-full"
                        value={newExperience.content}
                        onChange={(e) => setNewExperience({ ...newExperience, content: e.target.value })}
                      />
                      <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                        <Share2 className="h-4 w-4 mr-2" />
                        Post
                      </Button>
                    </form>
                  </CardContent>
                </Card>
                {experiences.map((experience) => (
                  <Card key={experience.id} className="border border-gray-200 rounded-lg">
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg font-semibold text-gray-800">{experience.destination}</CardTitle>
                      <CardDescription className="text-sm text-gray-600">Shared by {experience.userId}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-gray-700">{experience.content}</p>
                    </CardContent>
                    <CardFooter className="p-4">
                      <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Comment
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="messages">
              <div className="space-y-4">
                <ScrollArea className="h-[300px] w-full rounded-md border border-gray-200 p-4 bg-white">
                  {messages.map((message) => (
                    <div key={message.id} className="mb-4">
                      <div className="font-semibold text-gray-800">{message.senderId}</div>
                      <div className="text-sm text-gray-700">{message.content}</div>
                      <div className="text-xs text-gray-500">{new Date(message.timestamp).toLocaleString()}</div>
                    </div>
                  ))}
                </ScrollArea>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-grow"
                  />
                  <Button onClick={handleSendMessage} className="bg-blue-600 text-white hover:bg-blue-700">
                    Send
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}