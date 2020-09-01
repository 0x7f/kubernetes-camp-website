package camp.kubernetes.api.controller;

import camp.kubernetes.api.dto.SearchResult;
import lombok.SneakyThrows;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
public class SearchController {

    @RequestMapping(
            method = RequestMethod.GET,
            value = "/search",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    @ResponseBody
    @SneakyThrows
    public SearchResult reservations(
            @RequestParam(value = "date", required = true) final String date
    ) {
        // TODO implement search
        return SearchResult.builder().entries(Collections.emptyList()).build();
    }
}
