package testTask.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import testTask.model.SequenceOfNumbers;
import testTask.service.PrimeNumberService;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class WebController {

    private final PrimeNumberService numberService;

    @RequestMapping("/")
    public String index() {
        return "sequence";
    }

    @MessageMapping("/sequence.arrayGeneration")
    @SendTo("/topic/array")
    public SequenceOfNumbers arrayGeneration(@Payload SequenceOfNumbers sequence) {
        int value = Integer.parseInt(sequence.getContent());
        return new SequenceOfNumbers(Arrays.toString(numberService.arrayFill(value)));
    }

    @MessageMapping("/sequence.autoGeneration")
    @SendTo("/topic/autoNumbers")
    public SequenceOfNumbers autoGeneration(@Payload SequenceOfNumbers sequence) {
        String arrayString = sequence.getContent().substring(1, sequence.getContent().length() - 1);
        String[] array = arrayString.split(", ");
        return new SequenceOfNumbers(Arrays.toString(numberService.arrayGeneration(array)));
    }

    @MessageMapping("/sequence.generation")
    @SendTo("/topic/numbers")
    public SequenceOfNumbers generation(@Payload SequenceOfNumbers sequence) {
        String arrayString = sequence.getContent().substring(1, sequence.getContent().length() - 1);
        String[] array = arrayString.split(", ");
        List<String> list = new ArrayList<>();
        for (int i = 0; i < 5; i++) list.add(Arrays.toString(numberService.arrayGeneration(array)));
        return new SequenceOfNumbers(list.toString());
    }
}