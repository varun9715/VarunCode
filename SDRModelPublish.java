package ai.marcel.contentadmin.core.servlets;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.servlet.Servlet;
import javax.servlet.ServletException;

import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.propertytypes.ServiceDescription;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import ai.marcel.contentadmin.core.constants.Constants;
import ai.marcel.contentadmin.core.models.SDRFormListModel;
import ai.marcel.contentadmin.core.models.SDRFormModel;

@Component(service = Servlet.class, property = { "sling.servlet.methods=" + HttpConstants.METHOD_GET,
		"sling.servlet.paths=" + "/bin/sdr" })
@ServiceDescription("SDR Publish Servlet")
public class SDRModelPublish extends SlingSafeMethodsServlet {

	private static final long serialVersionUID = 1L;

	private transient Logger logger = LoggerFactory.getLogger(SDRModelPublish.class);

	@Override
	protected void doGet(final SlingHttpServletRequest req, final SlingHttpServletResponse resp)
			throws ServletException, IOException {
		Gson gson = new GsonBuilder().disableHtmlEscaping().create();
		List<SDRFormListModel> formFieldsList = new ArrayList<>();
		ResourceResolver resourceResolver = req.getResourceResolver();
		String response = StringUtils.EMPTY;
		resp.setContentType(Constants.APPLICATION_JSON);
		try {
			String path = req.getParameter("path");
			Resource variation = resourceResolver.getResource(path+"/jcr:content/root/responsivegrid/form");
			if(variation != null) {
				Node node = variation.adaptTo(Node.class);
				SDRFormModel sdrFormModel = new SDRFormModel();
				String mainTitle = node.getProperty("mainTitle").getString();
				String secondaryTitle = node.getProperty("secondaryTitle").getString();
				Node childNodes = node.getNode("formFields");
				NodeIterator nodeIterator = childNodes.getNodes();
				while(nodeIterator.hasNext()) {
					SDRFormListModel sdrFormListModel = new SDRFormListModel();
					Node childNode = nodeIterator.nextNode();
					sdrFormListModel.setFieldName(childNode.getProperty("fieldName").getString());
					sdrFormListModel.setFieldValue(childNode.getProperty("fieldValue").getString());
					formFieldsList.add(sdrFormListModel);				
				}
				sdrFormModel.setMainTitle(mainTitle);
				sdrFormModel.setSecondaryTitle(secondaryTitle);
				sdrFormModel.setSdrFormList(formFieldsList);
				response = gson.toJson(sdrFormModel);
			}

		} catch (Exception e) {
			logger.error("An exception has occured", e);
		}
		resp.getWriter().write(response);
	}
}
