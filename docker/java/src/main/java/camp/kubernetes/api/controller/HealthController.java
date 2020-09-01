package camp.kubernetes.api.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@RestController
public class HealthController {

    private static final Map<String, Object> EMPTY_OBJECT = new HashMap<>();

    @RequestMapping(
            method = RequestMethod.GET,
            value = "/healthy",
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE
    )
    public Map<String, Object> rootHealth(final HttpServletResponse response) {
        response.setStatus(HttpServletResponse.SC_OK);
        return EMPTY_OBJECT;
    }
}
