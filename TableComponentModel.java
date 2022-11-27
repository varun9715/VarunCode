package com.adobe.aem.illinois.core.models;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class TableComponentModel {

	@Inject
	private String id;

	@ChildResource(name = "table-rows")
	private List<Resource> table;

	private Map<Integer, List<String>> tableRows;

	private List<String> tableHeadings;

	@PostConstruct
	protected void init() {
		if (Objects.nonNull(table) && !table.isEmpty()) {
			tableHeadings = new ArrayList<>();
			tableRows = new LinkedHashMap<>();
			for (Resource tableRow : table) {
				if (Objects.nonNull(tableRow)) {
					String headingName = tableRow.getValueMap().get("headingName", StringUtils.EMPTY);
					tableHeadings.add(headingName);
					if (tableRow.hasChildren()) {
						Resource dataRows = tableRow.getChild("dataRows");
						addRowsData(dataRows);
					}
				}
			}
		}
	}

	private void addRowsData(Resource dataRows) {
		if (Objects.nonNull(dataRows) && dataRows.hasChildren()) {
			int count = 1;
			for (Resource rowResource : dataRows.getChildren()) {
				if (Objects.nonNull(rowResource)) {
					if (tableRows.containsKey(count)) {
						tableRows.get(count).add(rowResource.getValueMap().get("value", StringUtils.EMPTY));
					} else {
						List<String> valuesList = new ArrayList<>();
						valuesList.add(rowResource.getValueMap().get("value", StringUtils.EMPTY));
						tableRows.put(count, valuesList);
					}
				}
				count = count + 1;
			}
		}
	}

	public List<String> getTableHeadings() {
		return tableHeadings;
	}

	public Map<Integer, List<String>> getTableRows() {
		return tableRows;
	}

	public String getId() {
		return id;
	}
}