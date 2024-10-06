package com.example.TravelMates.services;


import com.example.TravelMates.model.Message;
import com.example.TravelMates.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    public Optional<Message> getMessageById(String id) {
        return messageRepository.findById(id);
    }

    public List<Message> getMessagesByUserId(String userId) {
        // In a real application, you'd query messages for a specific user
        // For simplicity, we're returning all messages
        return messageRepository.findAll();
    }

    public Message createMessage(Message message) {
        return messageRepository.save(message);
    }

    public Message updateMessage(String id, Message messageDetails) {
        Optional<Message> messageOptional = messageRepository.findById(id);
        if (messageOptional.isPresent()) {
            Message existingMessage = messageOptional.get();
            existingMessage.setSenderId(messageDetails.getSenderId());
            existingMessage.setReceiverId(messageDetails.getReceiverId());
            existingMessage.setContent(messageDetails.getContent());
            existingMessage.setTimestamp(messageDetails.getTimestamp());
            return messageRepository.save(existingMessage);
        }
        return null;
    }

    public void deleteMessage(String id) {
        messageRepository.deleteById(id);
    }

    // Add this method to resolve the 'sendMessage' issue
    public Message sendMessage(Message message) {
        return createMessage(message);
    }
}